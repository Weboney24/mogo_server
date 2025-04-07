const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      unique: true,
      required: true,
    },
    category_image: String,
    display_at: Number,
  },
  {
    timestamps: true,
    collection: "category",
  }
);

const subCategorySchema = new Schema(
  {
    sub_category_name: {
      type: String,
    },
    category_name: {
      type: String,
    },
    sub_category_image: String,
  },
  {
    timestamps: true,
    collection: "subcategory",
  }
);

const productCategorySchema = new Schema(
  {
    product_category_name: {
      type: String,
    },
    sub_category_name: {
      type: String,
    },
    category_name: {
      type: String,
    },
    product_category_image: String,
  },
  {
    timestamps: true,
    collection: "product_category",
  }
);

const brandSchema = new Schema(
  {
    brand_name: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "brand_datas",
  }
);

const fabricSchema = new Schema(
  {
    fabric_name: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "fabric_datas",
  }
);

module.exports = {
  Category: model("category", categorySchema),
  subCategory: model("subcategory", subCategorySchema),
  productCategory: model("product_category", productCategorySchema),
  BrandCategory: model("brand_datas", brandSchema),
  Favriccategory: model("fabric_datas", fabricSchema),
};
