const _ = require("lodash");

const { sendResponce } = require("../helper/responceHelper");
// models
const { BrandCategory, productCategory } = require("../models/category.models");
const Products = require("../models/product.models");
const BannerModel = require("../models/banner.models");

// controllers
const getallBrands = async (req, res) => {
  try {
    const result = await BrandCategory.find();
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "collecting Brands");
  }
};

const getallExploreProducts = async (req, res) => {
  try {
    const { category, subProduct } = JSON.parse(req.params.search);
    let where = {};
    if (!_.isEmpty(category)) {
      where.product_sub_category_name = {
        $in: category.map((res) => {
          return res._id;
        }),
      };
    }
    console.log(subProduct);
    if (subProduct) {
      where.product_product_category_name = subProduct;
    }
    console.log(where);
    const result = await Products.find(where);
    return res.status(200).send({ data: result });
  } catch (err) {
    console.error(err);
    sendResponce(res, "collecting Brands");
  }
};

const getAllBanners = async (req, res) => {
  try {
    const result = await BannerModel.find();
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "collecting Brands");
  }
};

const getCutomerProductCategory = async (req, res) => {
  try {
    const result = await productCategory.find();
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "collecting Brands");
  }
};

module.exports = {
  getallBrands,
  getallExploreProducts,
  getAllBanners,
  getCutomerProductCategory,
};
