const mongoose = require("mongoose");
const Course = require("./courseModel")
const transactionSchema = new mongoose.Schema({
  reference_id: String,
  amount: Number,
  status: String,
  timestamp: Date,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
});
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  transaction : [transactionSchema],
  category: {
    type: String,
    enum: ['publisher', 'admin', 'user'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', userSchema);