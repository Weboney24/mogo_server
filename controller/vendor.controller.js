const {
  Category,
  subCategory,
  productCategory,
  BrandCategory,
  Favriccategory,
} = require("../models/category.models");
const Vendor = require("../models/vendor.models");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { verifyPassword, tokenHelper } = require("../helper/authHelper");
const { sendResponce } = require("../helper/responceHelper");
const { handleUpload } = require("../helper/s3");
const categoryModels = require("../models/category.models");

// store
const registerStore = async (req, res) => {
  try {
    const { password } = req.body;
    const formData = req.body;
    formData.password = await bcrypt.hash(password, 10);
    await Vendor.create(formData);
    return res.status(200).send({ message: "Vendor created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).send({ message: "11000" });
    }
    console.error(err);
    return res.status(500).send({ message: "Vendor creation request failed" });
  }
};
// auth
const authVendor = async (req, res) => {
  try {
    let { email, password } = req.body;
    let vendor = await Vendor.find({ email: email });

    if (_.isEmpty(vendor)) {
      return res.status(500).send({ message: "Account Not Found" });
    }
    if (await verifyPassword(password, vendor[0].password, res)) {
      const result = tokenHelper(vendor);
      if (result) {
        return res.status(200).send({ token: result });
      }
    } else {
      return res.status(500).send({ message: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Something Went Wrong!" });
  }
};

// category
const createCategory = async (req, res) => {
  try {
    const result = await handleUpload(req.file);
    let formData = {
      ...req.body,
    };
    formData.category_image = result;
    await Category.create(formData);
    return res.status(200).send({ message: "Category  successfully created" });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res
        .status(500)
        .send({ message: "The category name has already been used." });
    }
    sendResponce("creating category");
  }
};

const getMyCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let where = {};
    if (id !== "all") {
      where.category_name = { $regex: id, $options: "i" };
    }
    const result = await Category.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting category");
  }
};

const deleteMyCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let verify = await subCategory.find({ category_name: id });
    if (!_.isEmpty(verify)) {
      return res.status(500).send({
        message:
          "You cannot delete this category because it is associated with a subcategory.",
      });
    }
    const result = await Category.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "Category  successfully deleted" });
  } catch (err) {
    console.log(err);
    sendResponce("Deleting category");
  }
};

const updateMyCategory = async (req, res) => {
  try {
    let formData = {
      category_name: req.body.category_name,
      display_at: req.body.display_at,
    };

    if (req.file) {
      const result = await handleUpload(req.file);
      formData.category_image = result;
    }
    await Category.findByIdAndUpdate({ _id: req.body.id }, formData);
    return res.status(200).send({ message: "Category updated successfully" });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res
        .status(500)
        .send({ message: "The category name has already been used." });
    }
    sendResponce("updating category");
  }
};

// subcategory
const craeteSubCategory = async (req, res) => {
  try {
    let { sub_category_name, category_name } = req.body;
    const result = await handleUpload(req.file);
    let formData = {
      ...req.body,
    };

    formData.sub_category_image = result;

    let verify = await subCategory.find({
      category_name: category_name,
      sub_category_name: sub_category_name,
    });

    if (!_.isEmpty(verify)) {
      return res.status(500).send({
        message:
          "The subcategory and category combination has already been created.",
      });
    }
    await subCategory.create(formData);
    return res
      .status(200)
      .send({ message: "Sub Category successfully created" });
  } catch (err) {
    console.log(err);
    sendResponce("creating sub category");
  }
};

const getSubCategory = async (req, res) => {
  try {
    const { search, filter } = JSON.parse(req.params.id);
    let where = {};

    if (search !== "all") {
      where.sub_category_name = { $regex: search, $options: "i" };
    }
    if (filter !== "no") {
      where.category_name = filter;
    }
    const result = await subCategory.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting sub category");
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await subCategory.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .send({ message: "Sub Category  successfully deleted" });
  } catch (err) {
    console.log(err);
    sendResponce("Deleting sub category");
  }
};

const updateSubCategory = async (req, res) => {
  try {
    let { sub_category_name, category_name } = req.body;
    // let verify = await subCategory.find({
    //   category_name: category_name,
    //   sub_category_name: sub_category_name,
    // });
    // if (!_.isEmpty(verify)) {
    //   return res.status(500).send({
    //     message:
    //       "The subcategory and category combination has already been added.",
    //   });
    // }
    let formData = req.body;
    if (req.file) {
      const result = await handleUpload(req.file);
      formData.sub_category_image = result;
    }

    await subCategory.findByIdAndUpdate({ _id: req.body.id }, formData);
    return res
      .status(200)
      .send({ message: "Sub Category updated successfully" });
  } catch (err) {
    console.log(err);
    sendResponce("updating category");
  }
};

// product category
const createProductCategory = async (req, res) => {
  try {
    let { sub_category_name, category_name, product_category_name } = req.body;
    let verify = await productCategory.find({
      category_name: category_name,
      sub_category_name: sub_category_name,
      product_category_name: product_category_name,
    });
    if (!_.isEmpty(verify)) {
      return res.status(500).send({
        message:
          "The subcategory, category and product category combination has already been created.",
      });
    }
    const result = await handleUpload(req.file);
    let formData = {
      ...req.body,
    };

    formData.product_category_image = result;
    await productCategory.create(formData);
    return res
      .status(200)
      .send({ message: "Product Category successfully created" });
  } catch (err) {
    sendResponce("creating Product category");
  }
};

const getProductcategory = async (req, res) => {
  try {
    const result = await productCategory.find().sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting product category");
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await productCategory.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .send({ message: "Product Category  successfully deleted" });
  } catch (err) {
    console.log(err);
    sendResponce("Deleting Product category");
  }
};

const updateProductCategory = async (req, res) => {
  try {
    let { sub_category_name, category_name, product_category_name } = req.body;
    // let verify = await productCategory.find({
    //   category_name: category_name,
    //   sub_category_name: sub_category_name,
    //   product_category_name: product_category_name,
    // });
    // if (!_.isEmpty(verify)) {
    //   return res.status(500).send({
    //     message:
    //       "The subcategory, category and product category combination has already been created.",
    //   });
    // }
    let formData = req.body;
    if (req.file) {
      const result = await handleUpload(req.file);
      formData.product_category_image = result;
    }
    await productCategory.findByIdAndUpdate({ _id: req.body.id }, formData);
    return res
      .status(200)
      .send({ message: "Product Category updated successfully" });
  } catch (err) {
    sendResponce("updating Product Category");
  }
};

// mobile
const getAllCategories = async (req, res) => {
  try {
    let where = {};

    let { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.category_name = { $regex: name, $options: "i" };
    }

    const result = await Category.find(where).sort({ display_at: 1 });

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    sendResponce("collecting Category");
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    let where = {};

    let { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.sub_category_name = { $regex: name, $options: "i" };
    }
    const result = await subCategory.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting SubCategory");
  }
};

const getAllProductCategories = async (req, res) => {
  try {
    let where = {};

    let { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.product_category_name = { $regex: name, $options: "i" };
    }
    const result = await productCategory.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting ProductCategory");
  }
};

const updateVendor = async (req, res) => {
  try {
    const { id } = req.userData;
    await Vendor.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send({ message: "vendor updated successfully" });
  } catch (err) {
    sendResponce(res, "updating vendor Profile");
  }
};

const createBrand = async (req, res) => {
  try {
    await BrandCategory.create(req.body);
    return res.status(200).send({ message: "brand created successfully" });
  } catch (err) {
    sendResponce(res, "creating brand");
  }
};

const getAllBrands = async (req, res) => {
  try {
    const response = await BrandCategory.find();
    return res.status(200).send({ data: response });
  } catch (err) {
    sendResponce(res, "creating brand");
  }
};

const createFabric = async (req, res) => {
  try {
    await Favriccategory.create(req.body);
    return res.status(200).send({ message: "brand created successfully" });
  } catch (err) {
    sendResponce(res, "creating brand");
  }
};

const getAllFabric = async (req, res) => {
  try {
    const response = await Favriccategory.find();
    return res.status(200).send({ data: response });
  } catch (err) {
    sendResponce(res, "creating brand");
  }
};

module.exports = {
  registerStore,
  authVendor,
  createCategory,
  getMyCategory,
  deleteMyCategory,
  updateMyCategory,
  craeteSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  createProductCategory,
  getProductcategory,
  deleteProductCategory,
  updateProductCategory,
  getAllCategories,
  getAllSubCategories,
  getAllProductCategories,
  updateVendor,
  createBrand,
  getAllBrands,
  createFabric,
  getAllFabric,
};
