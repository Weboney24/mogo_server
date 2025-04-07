const { sendResponce } = require("../helper/responceHelper");
const Coupon = require("../models/coupons.models");

const createCoupon = async (req, res) => {
  try {
    await Coupon.create(req.body);
    return res.status(200).send("success");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).send({ message: "Coupon Code Already Used" });
    }
    sendResponce("creating coupon");
  }
};

const getAllCoupon = async (req, res) => {
  try {
    const result = await Coupon.find();
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting coupon");
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Coupon.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "Coupon deleted successfully" });
  } catch (err) {
    sendResponce("deleting coupon");
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    await Coupon.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send({ message: "Coupon updated successfully" });
  } catch (err) {
    sendResponce("updating coupon");
  }
};

module.exports = { createCoupon, getAllCoupon, deleteCoupon, updateCoupon };
