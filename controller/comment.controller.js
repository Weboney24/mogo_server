const { sendResponce } = require("../helper/responceHelper");
const Comments = require("../models/comments.model");
const BulkRequest = require("../models/bulkrequest.models");
const reviewModels = require("../models/review.models");
const Notification = require("../models/notification.models");
const _ = require("lodash");

const makeComment = async (req, res) => {
  try {
    const { id } = req.userData;
    const formData = {
      ...req.body,
      user_id: id,
    };
    await Comments.create(formData);
    return res.status(200).send({ message: "Comment posted successfully" });
  } catch (err) {
    sendResponce(res, "posting comment");
  }
};

const getVariantComments = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comments.find({ variant_id: id })
      .populate("user_id", {
        user_password: 0,
        user_confirm_password: 0,
        cardProducts: 0,
        wishListProducts: 0,
        historyProducts: 0,
        deliveryAddressId: 0,
      })
      .sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "posting comment");
  }
};

const deleteVariantComments = async (req, res) => {
  try {
    const { id } = req.params;
    await Comments.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "Comment deleted successfully" });
  } catch (err) {
    sendResponce(res, "deleting comment");
  }
};

// bulk purchase request

const makeBulkRequest = async (req, res) => {
  try {
    const { id } = req.userData;
    const formData = {
      ...req.body,
      user_id: id,
    };

    await BulkRequest.create(formData);

    return res.status(200).send({ data: "success" });
  } catch (err) {
    console.error(err);
    sendResponce(res, "making Bulk Request");
  }
};

const getMyBulkUploadRequest = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await BulkRequest.find({ user_id: id }).populate(
      "product_id"
    );

    return res.status(200).send({ data: result });
  } catch (err) {
    console.error(err);
    sendResponce(res, "posting comment");
  }
};

// reviews
const makeReviews = async (req, res) => {
  try {
    const { id } = req.userData;
    const formData = {
      ...req.body,
      user_id: id,
    };
    await reviewModels.create(formData);
    return res.status(200).send({ message: "Review posted successfully" });
  } catch (err) {
    console.log(err)
    sendResponce(res, "posting Review");
  }
};

const getVariantReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewModels
      .find({ variant_id: id })
      .populate("user_id", {
        user_password: 0,
        user_confirm_password: 0,
        cardProducts: 0,
        wishListProducts: 0,
        historyProducts: 0,
        deliveryAddressId: 0,
      })
      .sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "posting Review");
  }
};

const deleteVariantReviews = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewModels.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "Comment deleted successfully" });
  } catch (err) {
    console.log(err);
    sendResponce(res, "deleting comment");
  }
};

// Notification

const collectNotificationCount = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await Notification.find({
      user_id: id,
      status: false,
    }).count();
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "collecting notification");
  }
};

const collectMyNotification = async (req, res) => {
  try {
    const { id } = req.userData;
    await Notification.updateMany({ user_id: id }, { status: true });
    const result = await Notification.find({
      user_id: id,
    }).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce(res, "collecting notification");
  }
};

module.exports = {
  makeComment,
  getVariantComments,
  makeBulkRequest,
  getMyBulkUploadRequest,
  makeReviews,
  getVariantReviews,
  deleteVariantComments,
  deleteVariantReviews,
  collectNotificationCount,
  collectMyNotification,
};
