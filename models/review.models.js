const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    variant_id: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    review: String,
    ratings: Number,
  },
  {
    timestamps: true,
    collection: "review_data",
  }
);

module.exports = model("review_data", reviewSchema);
