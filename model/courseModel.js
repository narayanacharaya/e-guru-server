const mongoose = require("mongoose");
const userSchema = require('./userModel');
const { Schema } = mongoose;
const videoSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: String,
    url: String,
  });
const topicSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    vedios:[videoSchema],
    description:String,
    quiz:String,
})
const courseModel= new  mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    category:String,
    name:String,
    author:{ type: Schema.Types.ObjectId, ref: 'userSchema' },
    topics:[topicSchema]
}
);
module.exports = mongoose.model('Course',courseModel);