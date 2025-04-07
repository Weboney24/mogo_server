const { Schema, model } = require("mongoose");

const bulkRequestSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    product_variant_id: String,
    count: Number,
  },
  {
    timestamps: true,
    collection: "bulk_request",
  }
);

module.exports = model("bulk_request", bulkRequestSchema);
