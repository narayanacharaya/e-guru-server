const axios = require('axios');

const title = 'Trading Options Basics';  // Course title for recommendation
const num_of_rec = 5;  // Number of recommendations

const requestData = {
  title: title,
  num_of_rec: num_of_rec
};

axios.post('http://localhost:5000/recommend', requestData)
  .then(response => {
    const recommendedCourses = response.data;
    console.log('Recommended Courses:');
    console.log(recommendedCourses);
  })
  .catch(error => {
    console.error('Error:', error);
  });