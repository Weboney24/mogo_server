const { sendResponce } = require("../helper/responceHelper");
const { handleUpload } = require("../helper/s3");
const Banner = require("../models/banner.models");

const craeteBanner = async (req, res) => {
  try {
    const result = await handleUpload(req.file);
    let data = JSON.parse(req.body.values);

    let formData = {
      ...data,
    };
    formData.banner_image = result;
    await Banner.create(formData);
    return res.status(200).send({ message: "Banner created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).send({ message: "Banner name Already Used" });
    }
    sendResponce("creating Banner");
  }
};

const getBanner = async (req, res) => {
  try {
    const result = await Banner.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    sendResponce("collecting Banners");
  }
};

const deleteBanner = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    await Banner.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "Banner Deleted Successfullt" });
  } catch (err) {
    console.log(err);
    sendResponce("collecting product");
  }
};

module.exports = { craeteBanner, getBanner, deleteBanner };
