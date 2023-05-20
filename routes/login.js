const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const mongoose = require ("mongoose");
const jwt= require("jsonwebtoken")
router.post('/', (req, res) => {
    // Find the user by email
    User.find({ email: req.body.email }).exec()
      .then(users => {
        // Check if any users are found with the provided email
        if (users.length < 1) {
          return res.status(404).json({ message: "Email not found" });
        }
        // Compare the provided password with the stored password
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          if (!result) {
            return res.status(401).json({ message: "Password was incorrect" });
          } else {
            // Generate a JWT token with user information
            const token = jwt.sign({
              username: users[0].username,
              category: users[0].category,
              email: users[0].email,
              id: users[0]._id,
            }, 'nepali guyz', { expiresIn: "30d" });
  
            // Return user information and the generated JWT token
            res.status(200).json({
              username: users[0].username,
              category: users[0].category,
              email: users[0].email,
              jwttoken: token
            });
          }
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
module.exports=router