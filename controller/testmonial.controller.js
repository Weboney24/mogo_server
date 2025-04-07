const Testimonial = require("../models/testmonial.models");

// Add Testimonial
const addtestmonial = async (req, res) => {
  try {
    const result = await Testimonial.create(req.body);
    res.status(201).json({
      message: "Testimonial added",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding testimonial",
      error: err.message,
    });
  }
};

// Get All Testimonials
const gettestmonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching testimonials",
      error: err.message,
    });
  }
};

// Delete Testimonial
const deletetestmonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({
      message: "Testimonial deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting testimonial",
      error: err.message,
    });
  }
};

// Edit/Update Testimonial
const updatetestmonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "Testimonial updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating testimonial",
      error: err.message,
    });
  }
};

module.exports = {
  addtestmonial,
  gettestmonial,
  deletetestmonial,
  updatetestmonial,
};
