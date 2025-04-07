const { upload } = require("../controller/multerHandler");
const {
  uploadImages,
  removeImages,
  uploadImagesSingle,
} = require("../controller/image.controller");
const router = require("express").Router();
const { verifyToken } = require("./verifytoke");

// auth routes
const auth_routes = require("./auth.routes");
router.use("/auth", auth_routes);

// vendors
const vendor_routes = require("./vendor.routes");
router.use("/vendor", vendor_routes);

// vendors category
const vendor_category = require("./vendor_category");
router.use("/vendor_category", verifyToken, vendor_category);

// Products
const mogo_products = require("./product.routes");
router.use("/products", verifyToken, mogo_products);

const notoken_products = require("./product.routes");
router.use("/products_details", notoken_products);

// upload Images
router.post(
  "/upload_images",
  verifyToken,
  upload.array("images"),
  uploadImages
);

router.post(
  "/upload_images_single",
  verifyToken,
  upload.single("images"),
  uploadImagesSingle
);

router.post("/remove_images", verifyToken, removeImages);

// mobile routes
const mobile = require("./mobile_routes");
router.use("/mobile", mobile);

// banner routes
const banner = require("./banner.routes");
router.use("/banner", banner);

// user routes
const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

// coupon routes
const couponRoutes = require("./coupon.routes");
router.use("/coupon", couponRoutes);

// store routes
const storeRoutes = require("./store.routes");
router.use("/store", storeRoutes);

// orders routes
const orderRoute = require("./order.routes");
router.use("/order", verifyToken, orderRoute);

// delivery charge routes
const deliveryChargeRoutes = require("./delivery.routes");
router.use("/delivery_charge", verifyToken, deliveryChargeRoutes);

// dashboard web routes
const dashboardRoutes = require("./dashboard.routes");
router.use("/dashboard", verifyToken, dashboardRoutes);

// customer ui routes

const webuiRoutes = require("./customerui.routes");
router.use("/customerui", webuiRoutes);

const reviewRoutes = require("./reviews.routes");
router.use("/adminui", reviewRoutes);

const testmonialRoutes = require("./testmonial.routes");
router.use("/test", testmonialRoutes);

module.exports = router;
