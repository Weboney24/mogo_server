const { sendResponce } = require("../helper/responceHelper");
const DeliveryLocation = require("../models/delivery_locations.models");
const DeliveryCharge = require("../models/delivery_charge");

const addNewDeliveryTiming = async (req, res) => {
  try {
    console.log(req.body);
    await DeliveryLocation.create(req.body);
    return res
      .status(200)
      .send({ message: "delivery Timing created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      console.error("hg");
      return res.status(500).send({
        message:
          "There is already a delivery Timing created for this KiloMeter Distance.",
      });
    }
    sendResponce(res, "creating new delivery distance");
  }
};

const getDeliveryLocations = async (req, res) => {
  try {
    const result = await DeliveryLocation.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    console.error(err);
    sendResponce(res, "collecting  delivery distance");
  }
};

const addNewDeliveryCharge = async (req, res) => {
  try {
    await DeliveryCharge.create(req.body);
    return res
      .status(200)
      .send({ message: "delivery Charge created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).send({
        message: "There is already a delivery Charge created for this Weight",
      });
    }
    sendResponce(res, "creating new delivery charges");
  }
};

const getDeliveryCharges = async (req, res) => {
  try {
    const result = await DeliveryCharge.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    console.error(err);
    sendResponce(res, "collecting  delivery charges");
  }
};

module.exports = {
  addNewDeliveryTiming,
  getDeliveryLocations,
  addNewDeliveryCharge,
  getDeliveryCharges,
};
