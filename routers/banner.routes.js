const {
  craeteBanner,
  getBanner,
  deleteBanner,
} = require("../controller/banner.controller");
const { upload } = require("../controller/multerHandler");

const router = require("express").Router();

router.post("/create_banner", upload.single("image"), craeteBanner);
router.get("/get_banner", getBanner);
router.get("/delete_banner/:id", deleteBanner);

module.exports = router;
