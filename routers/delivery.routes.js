const {
  getDeliveryLocations,
  addNewDeliveryTiming,
  addNewDeliveryCharge,
  getDeliveryCharges,
} = require("../controller/delivery_location.contoller");

const router = require("express").Router();

router.post("/add_new_delivery_timing", addNewDeliveryTiming);
router.get("/getall_delivery_location", getDeliveryLocations);
router.post("/add_new_delivery_charge", addNewDeliveryCharge);
router.get("/getall_delivery_charges", getDeliveryCharges);

router.get("/getall_delivery_duration", getDeliveryCharges);

module.exports = router;
