const passport = require('passport');
const User = require('../models/user');

module.exports = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    const { remembered } = req.body;
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        error: 'Указан неверный логин или пароль'
      });
    }
    if (user) {
      if (remembered) {
        res.cookie('access_token', user.access_token, {
          httpOnly: false,
          expires: new Date(Date.now() + 60 * 24 * 1000),
          path: '/'
        });
      }
      User.findOne({ id: user.id })
        .populate('permission')
        .then(userAuth => {
          res.json(userAuth);
        })
        .catch(err => {
          return res.status(400).json({
            error: `Произошла ошибка: ${err.message}`
          });
        });
    }
  })(req, res, next);
};
