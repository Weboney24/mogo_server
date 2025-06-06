const { sendResponce } = require("../helper/responceHelper");
const Orders = require("../models/order.models");
const TrackOrder = require("../models/trackorder.models");
const Notification = require("../models/notification.models");
const _ = require("lodash");
const { TrigerPayment } = require("./PaymentIntegration.controller");
const { orderMail } = require("../mail/sendmail");

const MakeOrder = async (req, res) => {
  try {
    req.body.userDetails = req.userData;
    req.body.user_id = req.userData.id;
    const result = await Orders.create(req.body);

    // const email = await orderMail({
    //   ...result._doc,
    //   invoice_no: req.body.productDetails[0].invoice_no,
    // });

    console.log("PAYMENT TYPE:", result.paymentType);
    if ((result.paymentType || "").trim().toLowerCase() === "online payment") {
      const payload = {
        order_id: result._id,
        user_email: _.get(result, "userDetails[0].email", ""),
        payment: result.paymentTotal,
      };
      console.log("Triggering CCAvenue Payment for Order ID:", result._id);
      return TrigerPayment(req, res, payload);
    }
    const trackResult = _.get(req, "body.productDetails", []).map((res) => {
      return {
        order_status: "confirmed",
        invoice_no: res.invoice_no,
        order_id: result._id,
      };
    });
    await TrackOrder.create(trackResult);
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
