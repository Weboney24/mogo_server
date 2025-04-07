const { sendResponce } = require("../helper/responceHelper");
const _ = require("lodash");
const Product = require("../models/product.models");
const Coupon = require("../models/coupons.models");

const collectCheckoutReadyproducts = async (req, res) => {
  try {
    const { id } = JSON.parse(_.get(req, "params.id", `{}`));
    const result = await Product.find({ _id: { $in: id } });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(err);
  }
};

const veriFyCoupon = async (req, res) => {
  try {
    const { id } = _.get(req, "params", ``);
    const result = await Coupon.findOne({ coupon_code: id });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(err);
  }
};

module.exports = { collectCheckoutReadyproducts, veriFyCoupon };
