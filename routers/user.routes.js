const router = require("express").Router();
// controller
const {
  registerUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/user.controller");
const { verifyToken } = require("./verifytoke");

router.post("/create_new_user", registerUser);
router.put("/update_user", verifyToken, updateUser);
router.delete("/delete_user/:id", deleteUser);
router.get("/get_all_user", getAllUser);

module.exports = router;
