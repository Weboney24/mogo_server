const { authUser } = require("../controller/auth.controller");
const {
  addToCart,
  collectMyCarts,
  getMyCarts,
  updateMyCart,
} = require("../controller/cards.controller");
const { veriFyCoupon } = require("../controller/checkout.controller");
const {
  getVariantComments,
  getVariantReviews,
  makeComment,
  deleteVariantComments,
  getMyBulkUploadRequest,
  makeBulkRequest,
  makeReviews,
  deleteVariantReviews,
} = require("../controller/comment.controller");
const {
  getallBrands,
  getallExploreProducts,
  getAllBanners,
  getCutomerProductCategory,
} = require("../controller/customerui.controller");
const {
  makeDefaultDeliveryAddress,
  deleteMydeliveryAddress,
  updateDeliveryAddress,
  collectMyDeliveryAddress,
  addDeliveryAddress,
} = require("../controller/deliveryAddress.controller");
const {
  getDeliveryCharges,
} = require("../controller/delivery_location.contoller");
const {
  MakeOrder,
  getMyOrderDetails,
  trackMyOrder,
  getSingleOrderDetails,
  cancelOrder,
} = require("../controller/order.controller");
const { masterProductSearch } = require("../controller/product.controller");
const { checkLoginStatus } = require("../controller/user.controller");
const {
  addToWishList,
  collectMyWishList,
  getMyWishList,
  updateMyWishList,
} = require("../controller/wishList.controller");
const { verifyToken } = require("./verifytoke");

const router = require("express").Router();

router.get("/getAll_Brands", getallBrands);
router.get("/getallExploreProducts/:search", getallExploreProducts);
router.get("/getAllBanners", getAllBanners);
// Product
router.get("/getCutomerProductCategory", getCutomerProductCategory);
router.get("/getSingleVariantComments/:id", getVariantComments);
router.get("/getSingleVariantReview/:id", getVariantReviews);

// auth
router.get("/globalSearchProduct/:search", masterProductSearch);
router.post("/authUser", authUser);
router.get("/login_status", verifyToken, checkLoginStatus);

// cart
router.post("/add_to_cart", verifyToken, addToCart);
router.get("/collect_my_carts", verifyToken, collectMyCarts);
router.get("/get_my_cards/:search", verifyToken, getMyCarts);
router.put("/update_my_cards", verifyToken, updateMyCart);

// wishlist
router.post("/add_to_list", verifyToken, addToWishList);
router.get("/collect_my_list", verifyToken, collectMyWishList);
router.get("/get_my_list/:search", verifyToken, getMyWishList);
router.put("/update_my_list", verifyToken, updateMyWishList);

// delivery charge
router.get("/getall_delivery_charges", verifyToken, getDeliveryCharges);

// delivery address
router.post("/add_delivery_address", verifyToken, addDeliveryAddress);
router.get(
  "/collectmy_delivery_address",
  verifyToken,
  collectMyDeliveryAddress
);
router.put(
  "/updatemy_delivery_address/:addressid",
  verifyToken,
  updateDeliveryAddress
);
router.delete(
  "/deletemy_delivery_address/:id",
  verifyToken,
  deleteMydeliveryAddress
);
router.put(
  "/makedefault_delivery_address",
  verifyToken,
  makeDefaultDeliveryAddress
);

// verify coupon
router.get("/get_coupon_details/:id", veriFyCoupon);

// orders
router.post("/create_order", verifyToken, MakeOrder);
router.post("/order_cancel/:id", verifyToken, cancelOrder);
router.get("/get_my_orders", verifyToken, getMyOrderDetails);
router.get("/get_single_order_details/:id", verifyToken, getSingleOrderDetails);
router.get("/track_my_order/:id", verifyToken, trackMyOrder);

// comments
router.post("/make_comment", verifyToken, makeComment);
router.delete("/delete_single_variant_comments/:id", deleteVariantComments);

// bulk request
router.post("/make_bulk_request", verifyToken, makeBulkRequest);
router.get("/get_my_bulkuploads", verifyToken, getMyBulkUploadRequest);

// reviews
router.post("/make_reviews", verifyToken, makeReviews);
router.get("/get_single_variant_reviews/:id", getVariantReviews);
router.delete("/delete_single_variant_reviews/:id", deleteVariantReviews);

module.exports = router;
