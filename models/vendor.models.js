const { Schema, model } = require("mongoose");

const venderSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    company_name: String,
    password: String,
    confirm_password: String,
    phone_number: String,
    GSTN: String,
    address: String,
    country: String,
    zipcode: String,
    state: String,
    logo: String,
    latitude: String,
    longitude: String,
    email: {
      unique: true,
      type: String,
    },
    role: {
      type: String,
      default: "vendor",
    },
  },
  {
    collection: "vendor",
    timestamps: true,
  }
);

module.exports = model("vendor", venderSchema);
