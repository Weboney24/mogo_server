const { MakeOrder, getMyOrderDetails, getSingleOrderDetails, getAllOrders, updateOrderStatus, trackMyOrder, paymentSuccess, PaymentSuccess, PaymentFailed } = require("../controller/order.controller");

const router = require("express").Router();

router.post("/create_order", MakeOrder);
router.get("/get_my_orders", getMyOrderDetails);
router.get("/get_single_order_details/:id", getSingleOrderDetails);
router.get("/track_my_order/:id", trackMyOrder);
router.post("/payment-success", PaymentSuccess);
router.post("/payment-failed", PaymentFailed);
// admin dashboard
router.get("/get_all_orders", getAllOrders);
router.put("/update_order_status", updateOrderStatus);

module.exports = router;
