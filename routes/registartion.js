const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const mongoose = require("mongoose");

router.post("/", async (req, res, next) => {
  try {
    const { username, email, password, category } = req.body;
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hashedPassword,
      email,
      category,
    });
    const savedUser = await newUser.save();
    res.status(200).json({ new_user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;