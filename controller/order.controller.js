const { sendResponce } = require("../helper/responceHelper");
const Orders = require("../models/order.models");
const TrackOrder = require("../models/trackorder.models");
const Notification = require("../models/notification.models");
const _ = require("lodash");
const { TrigerPayment } = require("./PaymentIntegration.controller");
const { orderMail, sendMail } = require("../mail/sendmail");
const { default: axios } = require("axios");
const TempOrders = require("../models/TempOrders");
const { decrypt } = require("./ccavutil");

const apiKey = process.env.ST_COURIER_API_KEY;
const apiUrl = process.env.ST_COURIER_API_URL;

const awbNumbers = ["53029107740", "53029107751", "53029107762", "53029107773", "53029107784", "53029107795", "53029107806", "53029107810", "53029107821", "53029107832"];
let currentAwbIndex = 0;

const MakeOrder = async (req, res) => {
  try {
    const user = req.userData;
    req.body.userDetails = user;
    req.body.user_id = user.id;

    const isOnline = (req.body.paymentType || "").trim().toLowerCase() === "online payment";
    const totalAmount = req.body.paymentTotal;

    if (isOnline) {
      const tempOrderId = `TMP-${Date.now()}`;

      // Save temp order
      await TempOrders.create({
        temp_id: tempOrderId,
        data: req.body,
      });

      // Trigger payment
      return TrigerPayment(req, res, {
        order_id: tempOrderId,
        user_email: user.email || "",
        payment: totalAmount,
      });
    }

    // COD → process immediately
    return await createFinalOrder(req, res, req.body);
  } catch (e) {
    console.error(e);
    sendResponce(e, res);
  }
};

const createFinalOrder = async (req, res, orderData) => {
  const user = req.userData || orderData.userDetails;
  const isCOD = (orderData.paymentType || "").trim().toLowerCase() === "cash on delivery";
  const totalAmount = orderData.paymentTotal;

  const result = await Orders.create(orderData);

  const assignedAwb = awbNumbers[currentAwbIndex] || "";
  const delivery = result.deliveryAddress?.[0] ?? {};
  const product = result.productDetails?.[0] ?? {};

  // Track Order
  const trackResult = (orderData.productDetails || []).map((item) => ({
    order_status: "confirmed",
    invoice_no: item.invoice_no,
    order_id: result._id,
  }));
  await TrackOrder.create(trackResult);

  // Send Email
  await sendMail({
    email: user.email,
    name: user.name,
    invoice_no: product.invoice_no,
    product_name: product.product_name,
    price: product.product_finalTotal,
    address: `${delivery.full_name}, ${delivery.address}, ${delivery.district}, ${delivery.pincode}`,
    productDetails: result.productDetails,
    totalAmount: totalAmount,
    target: "placed order",
  });

  // Courier Booking
  const courierData = [
    {
      awbno: assignedAwb,
      refno: product.invoice_no,
      orginsrc: "TNPVM",
      frmname: product.vender_name,
      frmadd1: product.vender_address,
      frmadd2: product.vender_address,
      frmpincode: product.vender_zipcode,
      frmphone: product.vender_phone,
      toname: user.name,
      toadd1: `${delivery.full_name}, ${delivery.address}, ${delivery.district}, ${delivery.pincode}`,
      toadd2: `${delivery.full_name}, ${delivery.address}, ${delivery.district}, ${delivery.pincode}`,
      toarea: delivery.address,
      topincode: delivery.pincode,
      tophone: delivery.phone_number,
      goodsname: product.product_name,
      goodsvalue: product.product_finalTotal,
      doctype: "N",
      transmode: "S",
      qty: product.product_quantity,
      weight: product.product_weight,
      volweight: product.whole_product_weights,
      topayamt: isCOD ? "0" : totalAmount,
      codamt: isCOD ? totalAmount : "0",
      invfiletype: "",
      invcopy: "",
    },
  ];

  if (currentAwbIndex < awbNumbers.length - 1) {
    currentAwbIndex++;
  }

  await axios.post("https://erpstcourier.com/ecom/v2/demobookings.php", courierData, {
    headers: {
      "API-TOKEN": "UcTcwSWsZGsl9X0ov84LVOlbWulxfYuT",
      "Content-Type": "application/json",
    },
  });

  if (!isCOD) return;
  return res.status(200).send({ message: "Order created successfully." });
};

const PaymentSuccess = async (req, res) => {
  try {
    const working_key = process.env.CCAVENUE_WORKING_KEY;
    const decrypted = decrypt(req.body.encResp, working_key);
    const params = new URLSearchParams(decrypted);

    const order_id = params.get("order_id");
    const order_status = params.get("order_status");

    if (order_status === "Success") {
      const tempOrder = await TempOrders.findOne({ temp_id: order_id });
      if (!tempOrder) {
        return res.status(400).send("Invalid temp order");
      }

      // Create final order
      await createFinalOrder(req, res, tempOrder.data);

      // Delete temp order
      await TempOrders.deleteOne({ temp_id: order_id });

      return res.redirect("https://themogo.com/payment-success"); // frontend success page
    } else {
      await TempOrders.deleteOne({ temp_id: order_id });
      return res.redirect("https://themogo.com/payment-failed"); // frontend failed page
    }
  } catch (e) {
    console.error(e);
    return res.redirect("https://themogo.com/payment-error");
  }
};

const PaymentFailed = async (req, res) => {
  try {
    const working_key = process.env.CCAVENUE_WORKING_KEY;
    const decrypted = decrypt(req.body.encResp, working_key);
    const params = new URLSearchParams(decrypted);
    const order_id = params.get("order_id");

    await TempOrders.deleteOne({ temp_id: order_id });
    return res.redirect("https://themogo.com/payment-failed"); // frontend failed page
  } catch (e) {
    console.error(e);
    return res.redirect("https://themogo.com/payment-error");
  }
};

const getMyOrderDetails = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await Orders.find({ user_id: id }).sort({ createdAt: -1 });

    return res.status(200).send({ data: result });
  } catch (e) {
    console.log(e);
    sendResponce(e);
  }
};

const getSingleOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Orders.find({ _id: id });
    const resut2 = await TrackOrder.find({ order_id: id });
    return res.status(200).send({ data: { orderData: result, trackingData: resut2 } });
  } catch (e) {
    sendResponce(e);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { id, role } = req.userData;

    let result = await Orders.find({}).sort({ createdAt: -1 });

    return res.status(200).send({ data: result });
  } catch (e) {
    console.log(e);
    return sendResponce(e, res);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    await Orders.updateOne(
      { "productDetails.invoice_no": req.body.invoice },
      {
        $set: { "productDetails.$.order_status": req.body.order_status },
      }
    );
    // track order
    const trackResult = {
      order_status: req.body.order_status,
      invoice_no: req.body.invoice,
      order_id: req.body.order_id,
      user_id: req.body.user_id,
    };
    await TrackOrder.create(trackResult);
    await Notification.create(trackResult);
    return res.status(200).send({ message: "order status updated successfully" });
  } catch (err) {
    console.error(err);
    sendResponce(res, err);
  }
};

const trackMyOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TrackOrder.find({ invoice_no: id });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, err);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findOne({ "productDetails.invoice_no": id });

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    const product = order.productDetails.find((p) => p.invoice_no === id);
    const currentStatus = product?.order_status;

    if (!product) {
      return res.status(400).send({ message: "Product not found in the order" });
    }

    if (currentStatus === "cancelled") {
      return res.status(400).send({ message: "Order already cancelled" });
    }

    if (["Item Picked Up By Delivery Partner", "Out For Delivery", "Delivered"].includes(currentStatus)) {
      return res.status(400).send({ message: "Cannot cancel shipped or delivered orders" });
    }

    await Orders.updateOne({ "productDetails.invoice_no": id }, { $set: { "productDetails.$.order_status": "Cancelled" } });

    const trackResult = {
      order_status: "Cancelled",
      invoice_no: id,
      order_id: order._id,
      user_id: order.user_id,
    };

    await TrackOrder.create(trackResult);
    await Notification.create(trackResult);

    return res.status(200).send({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error(error);
    return sendResponse(res, error); // Ensure this function exists and is spelled correctly
  }
};

module.exports = {
  MakeOrder,
  getMyOrderDetails,
  getSingleOrderDetails,
  getAllOrders,
  updateOrderStatus,
  trackMyOrder,
  cancelOrder,
  PaymentFailed,
  PaymentSuccess,
};
