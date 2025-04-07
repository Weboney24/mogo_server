const Favorite = require("../models/favorite.models");
const Product = require("../models/product.models");
const _ = require("lodash");

const addToWishList = async (req, res) => {
  try {
    let { id } = req.userData;
    let formData = {
      ...req.body,
      user_id: id,
    };
    await Favorite.create(formData);
    return res.status(200).send({ message: "added" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// const collectMyWishList = async (req, res) => {
//   try {
//     let { id } = req.userData;
//     const result = await Favorite.find({ user_id: id });
//     if (!_.isEmpty(result)) {
//       const variants = result.map((res) => {
//         return res.variant_id;
//       });

//       return res.status(200).send({ data: variants });
//     } else {
//       return res.status(200).send({ data: [] });
//     }
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// };

const collectMyWishList = async (req, res) => {
  try {
    let { id } = req.userData;
    const result = await Favorite.find({ user_id: id });
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

const getMyWishList = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await Favorite.find({ user_id: id }) .populate("product_id");

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

const updateMyWishList = async (req, res) => {
  try {
    let { id } = req.body;
    await Favorite.deleteOne({ variant_id: id });
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addToWishList,
  collectMyWishList,
  getMyWishList,
  updateMyWishList,
};
