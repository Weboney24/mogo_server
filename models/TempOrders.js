// models/TempOrders.js
const mongoose = require("mongoose");

const tempOrderSchema = new mongoose.Schema(
  {
    temp_id: { type: String, required: true, unique: true },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TempOrders", tempOrderSchema);
