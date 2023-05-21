const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Course = require("../model/courseModel");
const mongoose = require ("mongoose");
router.post('/:id',async (req, res) => {
    const { rating, comment } = req.body
  
    const course = await Course.findById(req.params.id)
  
    if (course) {
      const alreadyReviewed = course.reviews.find(
        (r) => r.user.toString() === req.id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('course already reviewed')
      }
      if(!rating){
        return res.status(401).json({"message":"rating is required"})
      }
      console.log(comment);
      if(!comment){
        return res.status(401).json({"message":"comment  is required"}) 
      }
      const review = {
      
        rating: Number(rating),
        comment,
        user: req.id,
      }
  
      course.reviews.push(review)
  
      course.numReviews = course.reviews.length
  
      course.rating =
      course.reviews.reduce((acc, item) => item.rating + acc, 0) /
      course.reviews.length
  
      await course.save()
      res.status(200).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('course not found')
    }
  })  
  module.exports= router