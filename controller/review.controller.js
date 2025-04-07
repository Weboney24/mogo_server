const Review = require("../models/review.models");

const getAllReviews = async (req, res) => {
  try {
    let where = {};

    const reviews = await Review.aggregate([
      {
        $match: where,
      },
      {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "user_Details",
          pipeline: [
            {
              $project: {
                user_password: 0,
              },
            },
          ],
        },
      },
    ]);

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    return res.status(200).json({
      message: "All reviews retrieved successfully",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllReviews };
