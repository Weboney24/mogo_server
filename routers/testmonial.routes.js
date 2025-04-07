const { addtestmonial, gettestmonial, deletetestmonial, updatetestmonial } = require("../controller/testmonial.controller");

const router = require("express").Router();

router.post("/add_testimondial", addtestmonial);
router.get("/get_testimondials", gettestmonial);
router.delete("/delete_testimondial/:id", deletetestmonial);
router.put("/update_testimondial/:id", updatetestmonial);

module.exports = router;
