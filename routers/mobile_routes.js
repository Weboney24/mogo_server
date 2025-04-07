const { getBanner } = require("../controller/banner.controller");
const {
  getAllNewArivalProducts,
  getAllSpecialProducts,
  getAllTrendingProducts,
  getSeachProducts,
  masterProductSearch,
  getOneStoreProduct,
  getRelatedProducts,
} = require("../controller/product.controller");
const {
  getAllCategories,
  getAllSubCategories,
  getAllProductCategories,
} = require("../controller/vendor.controller");

const router = require("express").Router();

// category
router.get("/get_all_categories/:search", getAllCategories);
router.get("/get_all_subcategories/:search", getAllSubCategories);
router.get("/get_all_productcategories/:search", getAllProductCategories);

// product
router.get("/get_special_products/:search", getAllSpecialProducts);
router.get("/get_trending_products/:search", getAllTrendingProducts);
router.get("/get_newarival_products/:search", getAllNewArivalProducts);
router.get("/get_search_products/:id", getSeachProducts);

// banner
router.get("/get_banner", getBanner);

// cart + verification
const card_routes = require("./cards.routes");
const { verifyToken } = require("./verifytoke");
router.use("/card", verifyToken, card_routes);

// wish list
const wishlist_routes = require("./wishList.routes");
router.use("/wishList", verifyToken, wishlist_routes);

// history
const history_routes = require("./history.routes");
router.use("/history", verifyToken, history_routes);

// history
const delivery_address_routes = require("./delivery_address.routes");
const { checkLoginStatus } = require("../controller/user.controller");
router.use("/deliveryAddress", verifyToken, delivery_address_routes);

// master search
router.get("/masterSearch/master_product_search/:search", masterProductSearch);
router.get("/products/get_oneStore_products/:id", getOneStoreProduct);
router.get("/products/get_related_products/:id", getRelatedProducts);

// userStatus
router.get("/login_status", verifyToken, checkLoginStatus);

// checkout
const checout_roter = require("../routers/checkout.routes");
router.use("/checkout", verifyToken, checout_roter);

// orders
const order_router = require("../routers/order.routes");
router.use("/orders", verifyToken, order_router);

// delivery charges
const delivery_charge_router = require("../routers/delivery.routes");
router.use("/delivery_charges", verifyToken, delivery_charge_router);

// comment routes
const commentroutes = require("./comment.routes");
router.use("/comment", verifyToken, commentroutes);

module.exports = router;
