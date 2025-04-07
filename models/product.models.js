const { suppressDeprecationWarnings } = require("moment");
const { Schema, model, models } = require("mongoose");

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },

    product_keywords: {
      type: String,
      required: true,
    },
    product_descriptions: {
      type: String,
      required: true,
    },
    product_images: {
      type: Array,
      required: true,
    },
    product_category_name: {
      type: String,
      required: true,
    },
    product_sub_category_name: {
      type: String,
    },
    product_product_category_name: {
      type: String,
    },

    product_category_nameactual: {
      type: String,
      required: true,
    },
    product_sub_category_nameactual: {
      type: String,
    },
    product_product_category_nameactual: {
      type: String,
    },

    mogo_selling_price: {
      type: Number,
    },
    mogo_discount_price: {
      type: Number,
    },
    mogo_mrp_price: {
      type: Number,
    },
    product_original_price: {
      type: Number,
    },
    product_quantity: {
      type: Number,
      // required: true,
    },
    product_in_stock: {
      type: Boolean,
      // required: true,
    },
    product_selling_price: {
      type: Number,
      // required: true,
    },
    product_sell_quantity: {
      type: Number,
      // required: true,
    },
    product_discount: {
      type: Number,
      // required: true,
    },
    product_approval_status: {
      type: String,
      required: true,
      default: "pending",
    },
    product_approval_status_comment: {
      type: String,
    },
    product_active_status: {
      type: Boolean,
      default: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "vendor",
    },
    special_selling_price: {
      type: Number,
    },
    special_product_discount: {
      type: Number,
    },
    special_mrp_price: {
      type: Number,
    },
    special_offer_status: {
      type: Boolean,
      default: false,
    },
    trending_product_status: {
      type: Boolean,
      default: false,
    },
    new_arival_status: {
      type: Boolean,
      default: false,
    },
    product_brand_id: String,
    product_fabric_id: String,
    product_variants: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "product",
  }
);

module.exports = model("product", productSchema);
