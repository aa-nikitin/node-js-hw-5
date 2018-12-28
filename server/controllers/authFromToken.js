const passport = require('passport');

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
      res.status(200).json(user);
    }
  })(req, res, next);
};
