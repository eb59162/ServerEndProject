const jwt = require('jsonwebtoken');
require('dotenv').config();
SECRET = process.env.SECRET

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};