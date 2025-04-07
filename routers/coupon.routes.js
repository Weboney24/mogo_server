const {
  createCoupon,
  getAllCoupon,
  deleteCoupon,
  updateCoupon,
} = require("../controller/coupon.controller");

const router = require("express").Router();

router.post("/create_coupon", createCoupon);
router.get("/collect_coupon", getAllCoupon);
router.delete("/delete_coupon/:id", deleteCoupon);
router.put("/update_coupon/:id", updateCoupon);

module.exports = router;
