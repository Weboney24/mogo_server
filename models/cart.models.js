const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    variant_id: String,
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    collection: "cart_data",
  }
);

module.exports = model("cart_data", cartSchema);
