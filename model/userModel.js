const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  category: {
    type: String,
    enum: ['publisher', 'admin', 'user'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', userSchema);