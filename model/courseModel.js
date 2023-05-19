const mongoose = require("mongoose");
const userSchema = require('./userModel');
const { Schema } = mongoose;
const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

const videoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  quiz: quizQuestionSchema
});

const topicSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  videos: [videoSchema],
  description: {
    type: String,
 
  },
  quiz: {
    type: String,

  }
});

const courseModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  level: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Use the model name 'User' here
    // required: true
  },
  topics: [topicSchema],
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Course', courseModel);