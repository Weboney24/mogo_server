const { Schema, model } = require("mongoose");

const couponSchema = new Schema(
  {
    coupon_name: {
      type: String,
      required: true,
    },
    coupon_code: {
      type: String,
      unique: true,
      required: true,
    },
    coupon_discount: {
      type: String,
      required: true,
    },
    coupon_status: {
      type: Boolean,
      required: true,
    },
    coupon_expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "coupon",
  }
);

module.exports = model("coupon", couponSchema);
