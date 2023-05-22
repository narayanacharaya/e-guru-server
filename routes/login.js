const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const mongoose = require ("mongoose");
const jwt= require("jsonwebtoken")
const auth = require("../middlewares/auth")
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
              id: users[0]._id,
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
  router.get('/',auth,async(req,res)=>{
  await  User.findById(req.id).then((user)=>{
      console.log(user);
      if (!user) {

        return res.status(404).json({ message: "account  not found" });
      }
      else{
        return res.status(200).json(
          {
            id: user._id,
              username: user.username,
              category: user.category,
              email: user.email,
          }
        )
      }
   
    })
  })
module.exports=router