const { Schema, model } = require("mongoose");

const deliveryAddress = new Schema(
  {
    address_name: String,
    full_name: String,
    phone_number: Number,
    alternate_phone_number: Number,
    pincode: Number,
    district: String,
    address: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    collection: "delivery_addres",
    timestamps: true,
  }
);

module.exports = model("delivery_addres", deliveryAddress);
