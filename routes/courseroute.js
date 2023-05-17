const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Course = require('../model/courseModel')
const ispublisher = require("../middlewares/ispublisher");
const { required } = require("joi");
const coursevalidator = require("../validator/courseupdatevalidtor")
 router.post('/',coursevalidator,ispublisher,(req,res)=>{
  const data = req.body;
  console.log(req.id)
  const newcourse = new Course({
    _id: new mongoose.Types.ObjectId(),
    author:req.id,
    category: data.category,
    name: data.name,
    topics: data.topics.map(topic => ({
      _id: new mongoose.Types.ObjectId(),
      name: topic.name,
      vedios: topic.vedios.map(video => ({
        _id: new mongoose.Types.ObjectId(),
        title: video.title,
        url: video.url,
      })),
      description: topic.description,
      quiz: topic.quiz,
    })),
  });
  newcourse.save()
    .then(savedCourse => {
      // Handle successful save
      res.status(201).json(savedCourse);
    })
    .catch(error => {
      // Handle error
      res.status(500).json({ error: error.message });
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