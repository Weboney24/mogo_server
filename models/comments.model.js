const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    variant_id: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    message: String,
  },
  {
    timestamps: true,
    collection: "comment_data",
  }
);

module.exports = model("comment_data", commentSchema);
