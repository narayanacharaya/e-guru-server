const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const mongoose = require("mongoose");

router.post("/", async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const { username, email, password, category } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User instance with the extracted data
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hashedPassword,
      email,
      category,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the saved user information
    res.status(200).json({ new_user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;