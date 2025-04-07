const {
  collectCheckoutReadyproducts,
  veriFyCoupon,
} = require("../controller/checkout.controller");

const router = require("express").Router();

router.get("/get_checkout_products/:id", collectCheckoutReadyproducts);

// coupon
router.get("/get_coupon_details/:id", veriFyCoupon);

module.exports = router;
