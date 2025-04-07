const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyPassword = async (password, hashPassword, res) => {
  try {
    const result = await bcrypt.compare(password, hashPassword);
    if (!result) {
      return false;
    }
    return true;
  } catch (err) {}
};

const tokenHelper = (datas) => {
  try {
    const formData = {
      id: _.get(datas, "[0].id", ""),
      role: _.get(datas, "[0].role", ""),
    };
    let token = jwt.sign(formData, process.env.key);
    return token;
  } catch (err) {}
};

module.exports = { verifyPassword, tokenHelper };
