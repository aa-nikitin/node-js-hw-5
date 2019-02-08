const User = require('../models/user');
const News = require('../models/news');
const Permission = require('../models/permission');

module.exports = (req, res, next) => {
  User.findOneAndDelete({ id: req.params.id })
    .then(user => {
      Permission.findByIdAndDelete(user.permissionId);
      return News.remove({ userId: user.id });
    })
    .then()
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка при удалении пользователя: ${err.message}`
      });
    });
};
