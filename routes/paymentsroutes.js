const express = require("express");
const router = express.Router();

const User = require('../model/userModel'); // Import the User model

router.post('/', async (req, res) => {
  const { amount, reference_id, courseId} = req.body;

  try {
    // Save transaction history to the user's transaction array
    const user = await User.findById(req.id); // Replace userId with the actual user's ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newTransaction = {
      reference_id,
      amount,
      status: 'saved',
      timestamp: new Date(),
      courseId: courseId,
    };

    user.transaction.push(newTransaction); // Make sure "transaction" is correctly spelled in your user model

    await user.save();
    console.log(user);
    return res.status(200).json({message: "payment addeed sucesfully"})
    // Handle the response and return appropriate data to the client
    // For example, you can return the URL received from eSewa for redirection

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.id).populate('transaction.courseId','name');// Replace req.id with the actual user's ID
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log(user.transaction); // Check if the transactions are being fetched correctly
  
      return res.status(200).json({ transaction: user.transaction});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
module.exports=router;