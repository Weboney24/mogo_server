const { addToCart, collectMyCarts,getMyCarts, updateMyCart } = require("../controller/cards.controller");

const router = require("express").Router();

router.post("/add_to_cart", addToCart);
router.get("/collect_my_carts", collectMyCarts);
router.get("/get_my_cards/:search", getMyCarts);
router.put("/update_my_cards", updateMyCart);

module.exports = router;
