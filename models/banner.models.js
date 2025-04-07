const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    banner_name: {
      type: String,
      unique: true,
      required: true,
    },
    banner_image: String,
    product_id: String,
    product_name: String,
  },
  {
    timestamps: true,
    collection: "banner",
  }
);

module.exports = model("banner",bannerSchema)