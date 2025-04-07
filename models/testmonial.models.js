// models/Testimonial.js
const { model, Schema } = require("mongoose");

module.exports = model(
  "testimonial",
  new Schema(
    {
      user: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  )
);
