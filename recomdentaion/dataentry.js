const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = './udemy_courses.csv'; // Replace with your CSV file path

const column1Data = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    if (row['Column1']) { // Replace 'Column1' with the actual column header
      column1Data.push(row['Column1']);
    }
  })
  .on('end', () => {
    console.log('Data from Column 1 in all rows:');
    console.log(column1Data);
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });
