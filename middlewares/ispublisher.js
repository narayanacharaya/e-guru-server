const jwt = require('jsonwebtoken');

const isPublisher = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the provided secret key
    const decodedToken = jwt.verify(token, 'nepali guyz');

    // Check if the decoded token's category is 'publisher'
    if (decodedToken.category !== 'publisher') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assign the decoded token's id to req.id for future use
    
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = isPublisher;