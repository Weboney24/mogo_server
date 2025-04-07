const {
  addToHistory,
  collectMyHistory,
  getMyHistory,
  updateMyHistory,
} = require("../controller/history.controller");

const router = require("express").Router();

router.post("/add_to_history", addToHistory);
router.get("/collect_my_history", collectMyHistory);
router.get("/get_my_history/:search", getMyHistory);
router.put("/update_my_history", updateMyHistory);

module.exports = router;
