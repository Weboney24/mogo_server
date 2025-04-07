const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const vendorModels = require("../models/vendor.models");

const authUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const result = await User.findOne({ user_email: user_email });
    if (!result) {
      return res.status(500).send({
        message: "Account not found!",
      });
    }
    let verifyPassword = await bcrypt.compare(user_password, result.user_password);
    if (!verifyPassword) {
      return res.status(500).send({
        message: "The password entered is incorrect.",
      });
    }
    let token = await jwt.sign(
      {
        id: result._id,
        name: result.user_name,
        email: result.user_email,
        mobile: result.user_mobile,
        profile_color: result.profile_color,
        user_profile: result.user_profile,
      },
      process.env.key
    );
    return res.status(200).send({
      data: {
        name: result.user_name,
        email: result.user_email,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getCurrentUserRole = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await vendorModels.find({ _id: id });
    let responce = {
      role: result[0].role,
      email: result[0].email,
      first_name: result[0].first_name,
      last_name: result[0].last_name,
      _id: result[0]._id,
    };
    return res.status(200).json(responce);
  } catch (err) {}
};

const getCurrentUserData = async (req, res) => {
  try {
    const { id } = req.userData;
    const result = await vendorModels.find(
      { _id: id },
      { password: 0, confirm_password: 0 }
    );

    return res.status(200).json({ data: result });
  } catch (err) {}
};

module.exports = {
  authUser,
  getCurrentUserRole,
  getCurrentUserData,
};
