const { Schema, model } = require("mongoose");

const trackOrders = new Schema(
  {
    order_status: String,
    invoice_no: String,
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "order_details",
    },
  },
  {
    timestamps: true,
    collection: "track_orders",
  }
);

module.exports = model("track_orders", trackOrders);
