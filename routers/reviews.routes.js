const { getAllReviews } = require("../controller/review.controller");
const { verifyToken } = require("./verifytoke");
const router = require("express").Router();

router.get("/getallreviews", verifyToken, getAllReviews);

module.exports = router;
