const User = require("../models/user.models");
const Product = require("../models/product.models");
const _ = require("lodash");

const addToHistory = async (req, res) => {
  console.log("triger");
  try {
    let { id } = req.userData;
    await User.findByIdAndUpdate(
      { _id: id },
      { $push: { historyProducts: req.body.id } }
    );
    return res.status(200).send({ message: "added" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const collectMyHistory = async (req, res) => {
  try {
    let { id } = req.userData;
    const result = await User.find({ _id: id }, { historyProducts: 1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getMyHistory = async (req, res) => {
  try {
    let { id } = req.userData;
    let { name } = JSON.parse(req.params.search);
    const result = await User.find({ _id: id }, { historyProducts: 1 });
    if (name !== "all") {
      where =  {$and:[{product_name : { $regex: name, $options: "i" } , _id: { $in: _.get(result, "[0].historyProducts", []) } }]}
    }else{
      where = { _id: { $in: _.get(result, "[0].historyProducts", []) }}
    }

    const products = await Product.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: products });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

const updateMyHistory = async (req, res) => {
  try {
    let { id } = req.userData;

    const result = await User.findByIdAndUpdate(
      { _id: id },
      { $pull: { historyProducts: _.get(req, "body.id", "") } }
    );
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addToHistory,
  collectMyHistory,
  getMyHistory,
  updateMyHistory,
};
