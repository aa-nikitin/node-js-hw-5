// const passport = require('passport');

const User = require('../models/user');
const Permission = require('../models/permission');

module.exports = (req, res, next) => {
  User.findOneAndDelete({ id: req.params.id })
    .then(user => {
      Permission.findByIdAndDelete(user.permissionId)
        .then()
        .catch(err => {
          return res.status(400).json({
            error: `Произошла ошибка при удалении разрешений: ${err.message}`
          });
        });
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка при удалении пользователя: ${err.message}`
      });
    });
};
