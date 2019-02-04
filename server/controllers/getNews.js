// const passport = require('passport');

module.exports = (req, res, next) => {
  // console.log(req.body);
  res.status(200).json({ user: req.user });
};
