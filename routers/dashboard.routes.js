const { fetchAllCounts } = require("../controller/dashboard.controller");

const router = require("express").Router();

router.get("/getAll_Counts", fetchAllCounts);

module.exports = router;
