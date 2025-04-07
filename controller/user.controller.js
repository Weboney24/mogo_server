const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { user_password, user_confirm_password } = req.body;
    const formData = req.body;
    formData.user_password = await bcrypt.hash(user_password, 10);
    // formData.user_confirm_password = await bcrypt.hash(
    //   user_confirm_password,
    //   10
    // );
    const result = await User.create(formData);

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

    return res
      .status(200)
      .send({ message: "user created successfully", token: token });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(500).send({ message: "11000" });
    }
    return res.status(500).send({ message: "user creation request failed" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.userData;
    const { password } = req.body;
    const formData = req.body;
    if (password) {
      formData.password = await bcrypt.hash(password, 10);
    }
    await User.findByIdAndUpdate({ _id: id }, formData);
    return res.status(200).send({ message: "user updated successfully " });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(500).send({ message: "11000" });
    }
    return res.status(500).send({ message: "user updation request failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).send({ message: "user deleded successfully " });
  } catch (err) {
    return res.status(500).send({ message: "user deletion request failed" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await User.find({ role: "user" }, { password: 0 }).sort({
      createdAt: -1,
    });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send({ message: "err" });
  }
};

const checkLoginStatus = async (req, res) => {
  try {
    const { id } = req.userData;

    const result = await User.findOne(
      { _id: id },
      {
        user_name: 1,
        user_email: 1,
        user_mobile: 1,
        user_profile: 1,
        profile_color: 1,
      }
    );
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "err" });
  }
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  getAllUser,
  checkLoginStatus,
};
