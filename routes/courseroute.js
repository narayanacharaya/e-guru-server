const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Course = require('../model/courseModel')
const ispublisher = require("../middlewares/ispublisher");
const { required } = require("joi");
const coursevalidator = require("../validator/courseupdatevalidtor")
router.post('/', ispublisher, async (req, res) => {
  try {
    // Extract the data from the request body
    const { level, description, thumbnail, category, name, topics, price } = req.body;
    
    if (!topics || topics.length === 0) {
      return res.status(400).json({ error: "At least one topic is required to add a course" });
    }

    // Calculate the total number of videos
    const totalVideos = topics.reduce((total, topic) => total + topic.videos.length, 0);

    // Create a new Course instance with the extracted data and totalVideos
    const newCourse = new Course({
      _id: new mongoose.Types.ObjectId(),
      author: req.id,
      level,
      description,
      thumbnail,
      category,
      name,
      topics: topics.map((topic) => ({
        _id: new mongoose.Types.ObjectId(),
        name: topic.name,
        videos: topic.videos.map((video) => ({
          _id: new mongoose.Types.ObjectId(),
          title: video.title,
          url: video.url,
          quiz: video.quiz,
        })),
        description: topic.description,
        quiz: topic.quiz,
      })),
      price,
      numberofvedio: totalVideos,
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: error.message });
  }
});

 
  router.get('/', (req, res) => {
    Course.find().limit(10)
      .populate('author', 'username') // Only populate the 'author' field with the 'name' property
      .select('name thumbnail author level') // Select only the 'name', 'thumbnail', and 'author' fields
      .then(courses => {
        const simplifiedCourses = courses.map(course => ({
          id :course.id,
          name: course.name,
          thumbnail: course.thumbnail,
          level:course.level,
          author: course.author ? course.author.username : '' // Check if author is null before accessing its properties
        }));
        res.json(simplifiedCourses);
      })
      .catch(err => {
        console.error('Error retrieving courses:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  router.get('/:id', (req, res) => {
    // Find the course by its ID
    Course.findById(req.params.id)
      // Populate the 'author' field and specify the fields to include: 'username', 'profilePicture', and 'description'
      .populate('author', 'username profilePicture description')
      .then(course => {
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
        // Return the course JSON response
        res.json(course);
      })
      .catch(err => {
        console.error('Error retrieving course:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
 router.delete('/:id', ispublisher, (req, res) => {
  const courseId = req.params.id;
  const authorId = req.id;

  // Find the course by its ID
  Course.findById(courseId)
    .then(course => {
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      // Check if the requesting user is the author of the course
      if (course.author != authorId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Delete the course by its ID
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
    });
});
 module.exports=router;