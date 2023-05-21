const mongoose = require("mongoose");
const User = require('./userModel');
const { Schema } = mongoose;
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'User',
           },
   },
  {
    timestamps: true,
  }
)
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
     required: true
  },
  topics: {
    type: [topicSchema],
    required: [true, 'At least one topic is required.'],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'At least one topic is required.'
    }
  },
  price: {
    type: Number,
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numberofvedio:{
    type:Number,
    required:true
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  numnberofenroll:{
    type:Number,
    required:true,
    default:0
  }
 
} ,{
  timestamps: true // Add timestamps option
});

module.exports = mongoose.model('Course', courseModel);