const passport = require('passport');
const User = require('../models/user');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        error: `Пользователь с таким токеном не найден`
      });
    }
    if (user) {
      User.findOne({ id: user.id })
        .populate('permission')
        .then(userAuth => {
          res.status(200).json(userAuth);
        })
        .catch(err => {
          return res.status(400).json({
            error: `Произошла ошибка: ${err.message}`
          });
        });
    }
  })(req, res, next);
};
