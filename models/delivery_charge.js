const { Schema, model } = require("mongoose");

const deliveryCharge = new Schema(
  {
    product_weight: {
      type: String,
      required: true,
      unique: true,
    },
    delivery_charge: String,
  },
  {
    timestamps: true,
    collection: "delivery_charge",
  }
);

module.exports = model("delivery_charge", deliveryCharge);
