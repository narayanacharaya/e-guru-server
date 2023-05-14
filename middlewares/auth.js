const jwt = require('jsonwebtoken');

const verification = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'JWT required' });
  }
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'nepali guyz');
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid JWT' });
  }
};

module.exports = verification;