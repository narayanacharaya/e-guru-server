const express = require("express");
const router = express.Router();
const Course = require('../model/courseModel')
const searchCourses = async (req, res) => {
  try {
    const { name, category, level, price } = req.query;

    // Create an empty filter object
    const filter = {};

    // Check if name query parameter is provided
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    // Check if level query parameter is provided
    if (level) {
      filter.level = level;
    }

    // Check if price query parameters are provided and are valid numbers
    if (price) {
      if (price.lte && !isNaN(price.lte)) {
        filter.price = { $lte: parseFloat(price.lte) };
      }
      if (price.gte && !isNaN(price.gte)) {
        filter.price = { ...filter.price, $gte: parseFloat(price.gte) };
      }
    }

    // Check if category query parameter is provided
    if (category) {
      filter.category = category;
    }

    // Query the database with the filters
    const courses = await Course.find(filter);

    res.json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: error });
  }
};
router.get('/',searchCourses)

  module.exports= router;