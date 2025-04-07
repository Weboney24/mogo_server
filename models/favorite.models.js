const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
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
    collection: "favorite_data",
  }
);

module.exports = model("favorite_data", favoriteSchema);
