const {
  createProduct,
  getMyProducts,
  getMyPendingProducts,
  getMyOutofStockProducts,
  getMyActiveStockProducts,
  updateProductRequestStatus,
  DeleteProduct,
  getAllProducts,
  updateProduct,
  getOneStoreProduct,
  getSingleProduct,
} = require("../controller/product.controller");

const router = require("express").Router();
// controller

router.post("/create_product", createProduct);
router.put("/update_product/:id", updateProduct);
router.get("/getmy_product/:search", getMyProducts);
router.get("/getall_product", getAllProducts);
router.get("/getmy_pending_product", getMyPendingProducts);
router.get("/getmy_outof_stock_product/:id", getMyOutofStockProducts);
router.get("/getmy_Active_product/:id", getMyActiveStockProducts);
router.put("/updateProduct_request", updateProductRequestStatus);
router.delete("/deleteProduct/:id", DeleteProduct);
router.get("/get_oneStore_products/:id", getOneStoreProduct);

//  no token
router.get("/getsingle_product/:id", getSingleProduct);

module.exports = router;
