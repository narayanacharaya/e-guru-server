const express = require("express");
const app = express();
const userRouter= require("./routes/registartion")
const loginRouter= require("./routes/login")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const signupvalidtormiddleware = require("./middlewares/signupvalidation")
const Course = require("./model/courseModel")
console.log("connecting databse");

mongoose.connect('mongodb://127.0.0.1:27017/e-guru', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

mongoose.connection.on('error', error => {
  console.error('MongoDB connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});


// Create a new course object
const newcourse = new Course({
  _id: new mongoose.Types.ObjectId,
  category: 'Web Development',
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

// Save the course object to the database
newcourse.save()
  .then(savedCourse => {
    console.log('Course saved successfully:', savedCourse);
  })
  .catch(err => {
    console.error('Error saving course:', err);
  });
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use("/registration",signupvalidtormiddleware,userRouter);
app.use("/login",loginRouter);

module.exports= app;