const { Schema, model } = require("mongoose");

const deliveryTimingSchema = new Schema(
  {
    kilo_meter: {
      type: String,
      required: true,
      unique: true,
    },
    delivery_timing: String,
    timing_type: String,
  },
  {
    timestamps: true,
    collection: "delivery_timing",
  }
);

module.exports = model("delivery_timing", deliveryTimingSchema);
