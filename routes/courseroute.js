const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Course = require('../model/courseModel')
const ispublisher = require("../middlewares/ispublisher");
const { required } = require("joi");
const coursevalidator = require("../validator/courseupdatevalidtor")
 router.post('/',ispublisher,async (req,res)=>{
  try {
    // Extract the data from the request body
    const { level, description, thumbnail, category, name,topics, price } = req.body;
    topics.map((topic)=>{
      console.log(topic)
    })
    // Create a new Course instance with the extracted data
    const newCourse = new Course({
      _id: new mongoose.Types.ObjectId(),
      author:req.id,
      level,
      description,
      thumbnail,
      category,
      name,

      topics: topics.map((topic)=>({
        _id: new mongoose.Types.ObjectId(),
        name: topic.name,
        videos: topic.videos.map((video) => ({
          _id: new mongoose.Types.ObjectId(),
          title: video.title,
          url: video.url,
          quiz: video.quiz
        })),
        description: topic.description,
        quiz: topic.quiz
      })),
      price
    });
    console.log(newCourse)

   // Save the new course to the database
    const savedCourse = await  newCourse.save();

   res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: error});
  }
  });

 
 router.get('/',(req,res)=>{

    Course.find().limit(10)
    .then(courses => {
      
      res.json(courses);
    })
    .catch(err => {
      console.error('Error retrieving courses:', err);
    });
 })

 router.get('/:id',(req,res)=>{


  Course.findById(req.params.id)
  .populate('author', 'username profilePicture description')
    .then(course => {
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    })
    .catch(err => {
      console.error('Error retrieving course:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
 })
 router.delete('/:id',ispublisher,(req,res)=>{
    const courseId = req.params.id;
    
    const authorId = req.id;
    
    Course.findById(courseId)
      .then(course => {
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
          console.log(authorId)
          console.log(course)
 
        if (course.author != authorId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    

        Course.findByIdAndDelete(courseId)
          .then(() => {
            return res.json({ message: 'Course deleted successfully' });
          })
          .catch(err => {
            console.error('Error deleting course:', err);
            return res.status(500).json({ message: 'Internal server error' });
          });
      })
      .catch(err => {
        console.error('Error finding course:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
 );
 })
 module.exports=router;