const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    productDetails: Array,
    deliveryAddress: Array,
    coupondiscountDetails: Array,
    userDetails: Array,
    paymentTotal: Number,
    paymentType: String,
    order_status: {
      default: "confirmed",
      type: "String",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    collection: "order_details",
  }
);

module.exports = model("order_details", orderSchema);
