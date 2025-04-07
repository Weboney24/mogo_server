const {
  addDeliveryAddress,
  collectMyDeliveryAddress,
  updateDeliveryAddress,
  deleteMydeliveryAddress,
  makeDefaultDeliveryAddress,
} = require("../controller/deliveryAddress.controller");

const router = require("express").Router();

router.post("/add_delivery_address", addDeliveryAddress);
router.get("/collectmy_delivery_address", collectMyDeliveryAddress);
router.put("/updatemy_delivery_address/:addressid", updateDeliveryAddress);
router.delete("/deletemy_delivery_address/:id", deleteMydeliveryAddress);
router.put("/makedefault_delivery_address", makeDefaultDeliveryAddress);

module.exports = router;
