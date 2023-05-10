const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Course = require('../model/courseModel')
 router.post('/',(req,res)=>{
    const newcourse = new Course({
        _id: new mongoose.Types.ObjectId,
        category: 'backend  Development',
        name: 'Node.js Basics',
      
        topics: [
          {
            name: 'Introduction to Node.js',
            vedios: [
              {
                title: 'What is Node.js?',
                url: 'https://www.youtube.com/watch?v=pU9Q6oiQNd0',
              },
              {
                title: 'Node.js Installation',
                url: 'https://www.youtube.com/watch?v=6OtTlW8jN6M',
              },
            ],
            description: 'Learn the basics of Node.js and how to install it on your computer',
            quiz: 'What is Node.js?'
          },
          {
            name: 'Node.js Modules',
            vedios: [
              {
                title: 'CommonJS Modules',
                url: 'https://www.youtube.com/watch?v=FziKs8ugRdE',
              },
              {
                title: 'NPM Packages',
                url: 'https://www.youtube.com/watch?v=MBTfYt1ghN0',
              },
            ],
            description: 'Learn about Node.js modules and how to use NPM packages',
            quiz: 'What is the purpose of NPM?'
          },
        ],
      });
      
    newcourse.save()
  .then(savedCourse => {
    console.log('Course saved successfully:', savedCourse);
  })
  .catch(err => {
    console.error('Error saving course:', err);
  });
 })
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
 router.delete('/:id',(req,res)=>{
    const courseId = req.params.id;
  Course.findByIdAndDelete(courseId)
    .then(deletedCourse => {
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.json({ message: 'Course deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting course:', err);
      return res.status(500).json({ message: 'Internal server error' });
    });
 })
 module.exports=router;