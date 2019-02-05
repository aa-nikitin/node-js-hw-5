const User = require('../models/user');

module.exports = (req, res, next) => {
  User.find({})
    .populate('permission')
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка при выборке Пользователей: ${err.message}`
      });
    });
};
