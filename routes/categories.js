const express = require("express");
const router = express.Router();

const Category = require('../model/category');

router.get('/', (req, res) => {
  console.log("I'm called");
  Category.find().then((categories) => {
    res.status(200).json(categories);
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  });
});

module.exports = router;