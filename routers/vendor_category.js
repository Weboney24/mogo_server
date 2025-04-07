const { upload } = require("../controller/multerHandler");
const {
  createCategory,
  getMyCategory,
  deleteMyCategory,
  updateMyCategory,
  craeteSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  createProductCategory,
  getProductcategory,
  deleteProductCategory,
  updateProductCategory,
  createBrand,
  getAllBrands,
  createFabric,
  getAllFabric,
} = require("../controller/vendor.controller");

const router = require("express").Router();
// controller

// category
router.post("/create_category", upload.single("image"), createCategory);
router.get("/getmy_category/:id", getMyCategory);
router.delete("/deletemy_category/:id", deleteMyCategory);
router.put("/update_category", upload.single("image"), updateMyCategory);

// sub categories
router.post("/create_subcategory", upload.single("image"), craeteSubCategory);
router.get("/get_subcategory/:id", getSubCategory);
router.delete("/deletesub_category/:id", deleteSubCategory);
router.put("/update_sub_category", upload.single("image"), updateSubCategory);

// product categories
router.post(
  "/create_productcategory",
  upload.single("image"),
  createProductCategory
);
router.get("/get_productcategory", getProductcategory);
router.delete("/deleteproduct_category/:id", deleteProductCategory);
router.put(
  "/update_product_category",
  upload.single("image"),
  updateProductCategory
);

// brand categories
router.post("/create_brand", createBrand);
router.get("/get_all_brands", getAllBrands);

// fabric categories
router.post("/create_fabric", createFabric);
router.get("/get_all_fabric", getAllFabric);

module.exports = router;
