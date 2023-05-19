const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const signupValidatorMiddleware = require("./validator/signupvalidation");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/registartion");
const course = require("./routes/courseroute");
const auth = require("./middlewares/auth")
const searchCourses = require('./routes/search')

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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/login", loginRouter);

app.use("/registration", signupValidatorMiddleware, userRouter);
app.use("/course",auth, course);
app.use('/Searchcourses', searchCourses);
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
module.exports = app;
