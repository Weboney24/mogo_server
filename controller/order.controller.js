const { sendResponce } = require("../helper/responceHelper");
const Orders = require("../models/order.models");
const TrackOrder = require("../models/trackorder.models");
const Notification = require("../models/notification.models");
const _ = require("lodash");
const { TrigerPayment } = require("./PaymentIntegration.controller");
const { orderMail } = require("../mail/sendmail");
const { default: axios } = require("axios");

const apiKey = process.env.ST_COURIER_API_KEY;
const apiUrl = process.env.ST_COURIER_API_URL;

const awbNumbers = ["53029107740", "53029107751", "53029107762", "53029107773", "53029107784", "53029107795", "53029107806", "53029107810", "53029107821", "53029107832"];
let currentAwbIndex = 0;

const MakeOrder = async (req, res) => {
  try {
    req.body.userDetails = req.userData;
    req.body.user_id = req.userData.id;

    const result = await Orders.create(req.body);

    const isOnline = (result.paymentType || "").trim().toLowerCase() === "online payment";
    const isCOD = (result.paymentType || "").trim().toLowerCase() === "cash on delivery";
    const assignedAwb = awbNumbers[currentAwbIndex] || "";
    const delivery = result.deliveryAddress?.[0] ?? {};
    const product = result.productDetails?.[0] ?? {};
    const user = result.userDetails?.[0] ?? {};
    const totalAmount = result.paymentTotal;

    const courierData = [
      {
        awbno: assignedAwb,
        refno: result.productDetails[0].invoice_no,
        orginsrc: "TNPVM",
        frmname: result.productDetails[0].vender_name,
        frmadd1: result.productDetails[0].vender_address,
        frmadd2: result.productDetails[0].vender_address,
        frmpincode: result.productDetails[0].vender_zipcode,
        frmphone: result.productDetails[0].vender_phone,
        toname: result.userDetails[0].name,
        toadd1: result.deliveryAddress[0].full_name + ", " + result.deliveryAddress[0].address + ", " + result.deliveryAddress[0].district + ", " + result.deliveryAddress[0].pincode,
        toadd2: result.deliveryAddress[0].full_name + ", " + result.deliveryAddress[0].address + ", " + result.deliveryAddress[0].district + ", " + result.deliveryAddress[0].pincode,
        toarea: result.deliveryAddress[0].address,
        topincode: result.deliveryAddress[0].pincode,
        tophone: result.deliveryAddress[0].phone_number,
        goodsname: result.productDetails[0].product_name,
        goodsvalue: result.productDetails[0].product_finalTotal,
        doctype: "N",
        transmode: "S",
        qty: result.productDetails[0].product_quantity,
        weight: result.productDetails[0].product_weight,
        volweight: result.productDetails[0].whole_product_weights,
        topayamt: isOnline ? totalAmount : "0",
        codamt: isCOD ? totalAmount : "0",
        invfiletype: "",
        invcopy: "",
      },
    ];

    if (isOnline) {
      const payload = {
        order_id: result._id,
        user_email: user.email || "",
        payment: totalAmount,
      };
      return TrigerPayment(req, res, payload);
    }

    const trackResult = (req.body.productDetails || []).map((item) => ({
      order_status: "confirmed",
      invoice_no: item.invoice_no,
      order_id: result._id,
    }));
    await TrackOrder.create(trackResult);

    if (currentAwbIndex < awbNumbers.length - 1) {
      currentAwbIndex++;
    }

    const courierResponse = await axios.post("https://erpstcourier.com/ecom/v2/demobookings.php", courierData, {
      headers: {
        "API-TOKEN": "UcTcwSWsZGsl9X0ov84LVOlbWulxfYuT",
        "Content-Type": "application/json",
      },
    });

    console.log("Courier API Response:", courierResponse.data);

    return res.status(200).send({ message: "order created" });
  } catch (e) {
    console.error(e);
    sendResponce(e);
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
    sendResponce(e);
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

module.exports = {
  MakeOrder,
  getMyOrderDetails,
  getSingleOrderDetails,
  getAllOrders,
  updateOrderStatus,
  trackMyOrder,
};
