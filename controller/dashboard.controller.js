const { sendResponce } = require("../helper/responceHelper");
const Product = require("../models/product.models");
const Vendor = require("../models/vendor.models");
const User = require("../models/user.models");
const Orders = require("../models/order.models");

const fetchAllCounts = async (req, res) => {
  try {
    const productCount = await Product.find().count();
    const vendorCount = await Vendor.find({ role: "vendor" }).count();
    const userCount = await User.find().count();
    const ordersCount = await Orders.find().count();
    const ordersDelivered = await Orders.find({
      "productDetails.order_status": "Delivered",
    }).count();

    const result = {
      productCount: productCount,
      vendorCount: vendorCount,
      userCount: userCount,
      ordersCount: ordersCount,
      ordersDelivered: ordersDelivered,
    };

    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "Collecting datas");
  }
};

module.exports = { fetchAllCounts };
