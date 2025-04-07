const {
  makeComment,
  getVariantComments,
  makeBulkRequest,
  getMyBulkUploadRequest,
  makeReviews,
  getVariantReviews,
  deleteVariantComments,
  deleteVariantReviews,
  collectNotificationCount,
  collectMyNotification,
} = require("../controller/comment.controller");

const router = require("express").Router();

// comments
router.post("/make_comment", makeComment);
router.get("/get_single_variant_comments/:id", getVariantComments);
router.delete("/delete_single_variant_comments/:id", deleteVariantComments);

// bulk request
router.post("/make_bulk_request", makeBulkRequest);
router.get("/get_my_bulkuploads", getMyBulkUploadRequest);

// reviews
router.post("/make_reviews", makeReviews);
router.get("/get_single_variant_reviews/:id", getVariantReviews);
router.delete("/delete_single_variant_reviews/:id", deleteVariantReviews);

// notification
// router.post("/make_reviews", makeReviews);
router.get("/get_notification_count", collectNotificationCount);
router.get("/collect_my_notification", collectMyNotification);

module.exports = router;
