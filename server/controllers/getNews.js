// const passport = require('passport');

module.exports = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
