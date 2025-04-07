const { sendResponce } = require("../helper/responceHelper");
const DeliveryAddress = require("../models/delivery_address");
const User = require("../models/user.models");

const addDeliveryAddress = async (req, res) => {
  try {
    const { id } = req.userData;
    const formData = req.body;
    formData.user_id = id;
    const value = await DeliveryAddress.create(formData);
    if (req.body.default) {
      const result = await User.findByIdAndUpdate(
        { _id: id },
        { deliveryAddressId: value._id }
      );
    }

    return res.status(200).send("success");
  } catch (err) {
    console.log(err);
    sendResponce("Create delivery address");
  }
};

const collectMyDeliveryAddress = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await DeliveryAddress.find({ user_id: id }).populate(
      "user_id",
      { deliveryAddressId: 1 }
    );
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("collecting delivery address");
  }
};

const updateDeliveryAddress = async (req, res) => {
  try {
    const { addressid } = req.params;
    const { id } = req.userData;



    const result = await DeliveryAddress.findByIdAndUpdate(
      { _id: addressid },
      req.body
    );

    if (req.body.default) {
      await User.findByIdAndUpdate(
        { _id: id },
        { deliveryAddressId: result._id }
      );
    }

    return res.status(200).send({ data: result });
  } catch (err) {
    console.error(err);
    sendResponce("updating delivery address");
  }
};

const deleteMydeliveryAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DeliveryAddress.findByIdAndDelete({ _id: id });

    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("updating delivery address");
  }
};

const makeDefaultDeliveryAddress = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await User.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send({ data: result });
  } catch (err) {
    sendResponce("updating delivery address");
  }
};

module.exports = {
  addDeliveryAddress,
  collectMyDeliveryAddress,
  updateDeliveryAddress,
  deleteMydeliveryAddress,
  makeDefaultDeliveryAddress,
};
