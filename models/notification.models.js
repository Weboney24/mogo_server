const { Schema, model } = require("mongoose");

const notoficationSchema = new Schema(
  {
    order_id: String,
    invoice_no: String,
    order_date: String,
    total_amount: String,
    delivery_address: String,
    order_status: String,
    status: {
      type: Boolean,
      default: false,
    },
    user_id: String,
  },
  {
    timestamps: true,
    collection: "notofication_datas",
  }
);

module.exports = model("notofication_datas", notoficationSchema);
