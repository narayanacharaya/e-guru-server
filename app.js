const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const signupValidatorMiddleware = require("./validator/signupvalidation");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/registartion");
const course = require("./routes/courseroute");
const auth = require("./middlewares/auth")
const searchCourses = require('./routes/search')
const review = require('./routes/review')
const category = require('./routes/categories')
const testingrouter = require('./routes/testingrouter')
const Paymentroute= require('./routes/paymentsroutes')
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hcmF5YW4iLCJjYXRlZ29yeSI6InB1Ymxpc2hlciIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWQiOiI2NDYxYWJjMjkzNzhkMWUxMzBmYjE2YmEiLCJpYXQiOjE2OTI4NzAyMjMsImV4cCI6MTY5NTQ2MjIyM30.X1ontC1cJIvP8k6u9O_1FAh9tMCyfFWmo4ZiiWqqais';
//mongodb+srv://acharayanarayan01:cbWYI2jVGeqNfDsP@cluster0.48ymwaj.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://acharayanarayan01:cbWYI2jVGeqNfDsP@cluster0.48ymwaj.mongodb.net/e-guru?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
  const fs = require('fs');
mongoose.connection.on('error', error => {
  console.error('MongoDB connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options("http://localhost:5173/", cors());

app.use("/login", loginRouter);

app.use("/registration", signupValidatorMiddleware, userRouter);
app.use("/course", auth, course);
app.use('/Searchcourses', auth, searchCourses);
app.use('/review', auth, review);
app.use('/category', auth, category);
app.use('/testing', testingrouter)
app.use('/payment',auth,Paymentroute)
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
