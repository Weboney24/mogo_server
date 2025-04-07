const router = require("express").Router();
// controller
const {
  registerStore,
  authVendor,
  getCurrentUserRole,
  updateVendor,
} = require("../controller/vendor.controller");
const { getZipCodeAddress } = require("../controller/zipcode.controller");
const { verifyToken } = require("./verifytoke");

router.post("/create_new_vendor", registerStore);
router.post("/auth_vendor", authVendor);
router.post("/get_zipcode_address", getZipCodeAddress);
router.put("/update_vendor_details", verifyToken, updateVendor);

module.exports = router;
