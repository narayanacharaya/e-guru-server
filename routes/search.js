const express = require("express");
const router = express.Router();
const Course = require('../model/courseModel')
const searchCourses = async (req, res) => {
  try {
    const { name, category, level, price } = req.query;

    // Create a filter object to store the search criteria
    const filter = {};
    console.log(category)

    // Add the name search criteria to the filter
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    // Add the level search criteria to the filter
    if (level) {
      filter.level = level;
    }

    // Add the price search criteria to the filter
    if (price && !isNaN(price.lte)) {
      filter.price = { $lte: parseFloat(price.lte) };
    }
    if (price && !isNaN(price.gte)) {
      filter.price = { ...filter.price, $gte: parseFloat(price.gte) };
    }

    // Add the category search criteria to the filter
    if (category) {
      console.log(category)
      filter.category =category.split(' ')[0];
    }
   console.log(filter) 
    // Query the database with the filters
    const courses = await Course.find(filter)
      .populate('author', 'username') // Only populate the 'author' field with the 'username' property
      .select('name thumbnail author level'); // Select only the 'name', 'thumbnail', 'author', and 'level' fields
    console.log(courses)
    res.json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: error });
  }
};

router.get('/',searchCourses)

  module.exports= router;