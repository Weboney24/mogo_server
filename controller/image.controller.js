const { sendResponce } = require("../helper/responceHelper");
const { handleUpload, handleDelete } = require("../helper/s3");

const uploadImages = async (req, res) => {
  try {
    let images = [];
    for (const file of req.files) {
      const uploadedImage = await handleUpload(file);
      images.push(uploadedImage);
    }
    return res
      .status(200)
      .send({ data: images, messages: "Image successfully uploaded" });
  } catch (err) {
    console.error(err);
    sendResponce("uploading images");
  }
};

const uploadImagesSingle = async (req, res) => {
  try {
    const uploadedImage = await handleUpload(req.file);

    return res
      .status(200)
      .send({ data: uploadedImage, messages: "Image successfully uploaded" });
  } catch (err) {
    console.log(err);
    sendResponce(res, "uploading images");
  }
};

const removeImages = async (req, res) => {
  try {
    await handleDelete(req.body.path);
    return res.status(200).send({ message: "Image  Successfully Deleted" });
  } catch (err) {
    sendResponce("uploading images");
  }
};

module.exports = { uploadImages, removeImages, uploadImagesSingle };
