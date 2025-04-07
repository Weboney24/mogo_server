const {
  updateMyWishList,
  getMyWishList,
  collectMyWishList,
  addToWishList,
} = require("../controller/wishList.controller");

const router = require("express").Router();

router.post("/add_to_list", addToWishList);
router.get("/collect_my_list", collectMyWishList);
router.get("/get_my_list/:search", getMyWishList);
router.put("/update_my_list", updateMyWishList);

module.exports = router;
