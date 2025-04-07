const { sendResponce } = require("../helper/responceHelper");
const vendorModels = require("../models/vendor.models");
const User = require("../models/user.models");

const getAllStores = async (req, res) => {
  try {
    const store = await vendorModels.find(
      { role: "vendor" },
      { password: 0, confirm_password: 0 }
    );
    return res.status(200).send({ data: store });
  } catch (err) {
    sendResponce(res, "collecting all stores");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const store = await User.find({}, { password: 0, confirm_password: 0 });
    return res.status(200).send({ data: store });
  } catch (err) {
    sendResponce(res, "collecting all users ");
  }
};

module.exports = {
  getAllStores,
  getAllUsers,
};
