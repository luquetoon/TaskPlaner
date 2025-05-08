const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1h' });
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { generateToken, hashPassword, comparePassword };

