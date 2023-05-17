const jwt = require('jsonwebtoken');

const ispublisher = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decodedToken = jwt.verify(token, 'nepali guyz');
    
    if (decodedToken.category !== 'publisher') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.id = decodedToken.id;
    next();
  } catch (err) {
  //  console.error('Error verifying token:', err);
    return res.status(500).json({ message: err });
  }
};

module.exports = ispublisher;