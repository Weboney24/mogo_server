const { sendResponce } = require("../helper/responceHelper");
const Product = require("../models/product.models");

const createProduct = async (req, res) => {
  try {
    const { id } = req.userData;
    let formData = {
      ...req.body,
      user_id: id,
    };
    await Product.create(formData);
    return res.status(200).send({ message: "Product created successfully" });
  } catch (err) {
    console.error(err);
    sendResponce("creating product");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let formData = {
      ...req.body,
    };
    await Product.findByIdAndUpdate({ _id: id }, formData);
    return res.status(200).send({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    sendResponce("creating product");
  }
};

const getMyProducts = async (req, res) => {
  try {
    const { id, role } = req.userData;
    const { search } = req.params;

    let where = {};

    if (role != "admin") {
      where.user_id = id;
    }

    if (search !== "all") {
      where.product_name = { $regex: search, $options: "i" };
    }

    const result = await Product.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting product");
  }
};

const getMyPendingProducts = async (req, res) => {
  try {
    const { id, role } = req.userData;
    let where = {};
    if (role != "admin") {
      where.user_id = id;
    }
    const result = await Product.find({
      product_approval_status: "pending",
    }).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting product");
  }
};

const getMyOutofStockProducts = async (req, res) => {
  try {
    const formData = req.params.id;
    const { filter } = JSON.parse(formData);
    const { id, role } = req.userData;

    let where = {};

    if (role != "admin") {
      where.user_id = id;
    }

    if (filter !== "all") {
      where.product_in_stock = filter % 2 != 0 ? true : false;
    }

    const result = await Product.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting product");
  }
};

const getMyActiveStockProducts = async (req, res) => {
  try {
    const formData = req.params.id;
    const { filter } = JSON.parse(formData);
    const { id, role } = req.userData;

    let where = {};

    if (role != "admin") {
      where.user_id = id;
    }
    if (filter !== "all") {
      where.product_active_status = filter % 2 != 0 ? true : false;
    }
    const result = await Product.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting product");
  }
};

const updateProductRequestStatus = async (req, res) => {
  try {
    const formData = req.body;
    await Product.findByIdAndUpdate({ _id: formData.product_id }, formData);
    return res
      .status(200)
      .send({ message: "Product Request Successfully Updated" });
  } catch (err) {
    sendResponce("updating product Request");
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "Product  Successfully Deleted" });
  } catch (err) {
    sendResponce("Deleting product");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { id, role } = req.userData;

    let where = {
      product_active_status: true,
      product_approval_status: "Accepted",
    };

    if (role != "admin") {
      where.user_id = id;
    }

    const result = await Product.find(where).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting product");
  }
};

const getAllSpecialProducts = async (req, res) => {
  try {
    let where = {
      product_active_status: true,
      special_offer_status: true,
      product_approval_status: "Accepted",
    };
    let { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.product_name = { $regex: name, $options: "i" };
    }
    const result = await Product.find(where).sort({ createdAt: -1 });

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    sendResponce("collecting product");
  }
};

const getAllTrendingProducts = async (req, res) => {
  try {
    let where = {
      product_active_status: true,
      trending_product_status: true,
      product_approval_status: "Accepted",
    };
    let { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.product_name = { $regex: name, $options: "i" };
    }
    const result = await Product.find(where).sort({ createdAt: -1 });

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    sendResponce("collecting product");
  }
};

const getAllNewArivalProducts = async (req, res) => {
  try {
    let where = {
      product_active_status: true,
      new_arival_status: true,
      product_approval_status: "Accepted",
    };
    let { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.product_name = { $regex: name, $options: "i" };
    }
    const result = await Product.find(where).sort({ createdAt: -1 });

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    sendResponce("collecting product");
  }
};

const getSeachProducts = async (req, res) => {
  try {
    const { name } = JSON.parse(req.params.id);
    let where = { product_approval_status: "Accepted" };
    if (name !== "all") {
      where.product_name = { $regex: name, $options: "i" };
    }
    const result = await Product.find(where);
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

const masterProductSearch = async (req, res) => {
  try {
    let where = {
      product_active_status: true,
      product_approval_status: "Accepted",
    };
    const { name } = JSON.parse(req.params.search);
    if (name !== "all") {
      where.product_name = { $regex: name, $options: "i" };
    }

    const result = await Product.find(where).populate("user_id", {
      confirm_password: 0,
      password: 0,
    });
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

const getOneStoreProduct = async (req, res) => {
  try {
    let where = {
      product_active_status: true,
      product_approval_status: "Accepted",
    };
    const { id } = req.params;

    where.user_id = id;

    const result = await Product.find(where).populate("user_id", {
      confirm_password: 0,
      password: 0,
    });
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    let where = {
      product_active_status: true,
      product_approval_status: "Accepted",
    };
    const { id } = req.params;

    where.product_sub_category_name = id;

    const result = await Product.find(where).populate("user_id", {
      confirm_password: 0,
      password: 0,
    });
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findOne({ _id: id }).populate("user_id");
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "collecting product details");
  }
};

module.exports = {
  createProduct,
  getMyProducts,
  getMyPendingProducts,
  getMyOutofStockProducts,
  getMyActiveStockProducts,
  updateProductRequestStatus,
  DeleteProduct,
  getAllProducts,
  getAllSpecialProducts,
  getAllTrendingProducts,
  getAllNewArivalProducts,
  getSeachProducts,
  masterProductSearch,
  updateProduct,
  getOneStoreProduct,
  getRelatedProducts,
  getSingleProduct,
};
