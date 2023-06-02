const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../model/testing vedio');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('video'), async (req, res) => {
  // Extract video details from the request
  const { title, description } = req.body;
  const url = req.file.path; // Assuming the video file is uploaded and stored locally

  // Create a new video record
  try {
    const video = await Video.create({ title, description, url });
    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload video.' });
  }
});
module.exports= router;


