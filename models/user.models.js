const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      required: true,
      type: String,
    },
    user_mobile: {
      required: true,
      type: Number,
    },
    user_password: {
      required: true,
      type: String,
    },
    user_confirm_password: String,
    user_email: {
      unique: true,
      type: String,
    },
    user_profile: String,
    cardProducts: Array,
    wishListProducts: Array,
    historyProducts: Array,
    deliveryAddressId: String,
    profile_color:String,
  },
  {
    collection: "user",
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
