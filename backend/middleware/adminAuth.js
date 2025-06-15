const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    next();
  } catch {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = { verifyAdmin };

// This middleware function verifies if the request is made by an admin user.
// It checks for a valid JWT token and ensures the user role is 'admin'.
