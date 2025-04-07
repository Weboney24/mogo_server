const {
  authUser,
  getCurrentUserRole,
  getCurrentUserData,
} = require("../controller/auth.controller");
const { verifyToken } = require("./verifytoke");

const router = require("express").Router();
// controller

router.post("/auth_user", authUser);

// role
router.get("/get_current_userRole", verifyToken, getCurrentUserRole);
router.get("/getcuurent_user_data", verifyToken, getCurrentUserData);

module.exports = router;
