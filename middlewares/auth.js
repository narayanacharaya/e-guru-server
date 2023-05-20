const jwt = require('jsonwebtoken');

const verification = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'JWT required' });
  }

  try {
    const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
    jwt.verify(token, 'nepali guyz'); // Verify the token using the provided secret key
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid JWT' });
  }
};

module.exports = verification;