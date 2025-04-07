const User = require("../models/user.models");
const Product = require("../models/product.models");
const Cart = require("../models/cart.models");
const _ = require("lodash");

const addToCart = async (req, res) => {
  try {
    console.log(req.body)
    let { id } = req.userData;
    let formData = {
      ...req.body,
      user_id: id,
    };
    await Cart.create(formData);
    return res.status(200).send({ message: "added" });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: err.message });
  }
};

const collectMyCarts = async (req, res) => {
  try {
    let { id } = req.userData;
    const result = await Cart.find({ user_id: id });
    if (!_.isEmpty(result)) {
      const variants = result.map((res) => {
        return res.variant_id;
      });

      return res.status(200).send({ data: variants });
    } else {
      return res.status(200).send({ data: [] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

const getMyCarts = async (req, res) => {
  try {
    let { id } = req.userData;

    let { name } = JSON.parse(req.params.search);
    const result = await Cart.find({ user_id: id });
    const variants = result?.map((res) => {
      return res.variant_id;
    });

    if (name !== "all") {
      where = {
        $and: [
          {
            product_name: { $regex: name, $options: "i" },
            _id: { $in: variants },
          },
        ],
      };
    } else {
      where = { "product_variants.varient_unique_id": { $in: variants } };
    }

    const products = await Product.find(where).populate("user_id", {
      confirm_password: 0,
      password: 0,
    });

    const finalProduct = products?.map((res) => {
      return res.product_variants.filter((value) => {
        return variants.includes(value.varient_unique_id);
      });
    });

    return res
      .status(200)
      .send({ data: { carts: finalProduct.flat(), product: products } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

const updateMyCart = async (req, res) => {
  try {
    let { id } = req.body;
    await Cart.deleteOne({ variant_id: id });
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { addToCart, collectMyCarts, getMyCarts, updateMyCart };
