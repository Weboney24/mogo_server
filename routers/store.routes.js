const { getAllStores, getAllUsers } = require("../controller/store.controller");

const router = require("express").Router();

router.get("/getAllStores", getAllStores);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
