const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/database');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
};

const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };