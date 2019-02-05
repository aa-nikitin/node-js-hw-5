// const passport = require('passport');
const Permission = require('../models/permission');

module.exports = (req, res, next) => {
  const { permissionId, permission } = req.body;
  // console.log(req.body);
  Permission.findByIdAndUpdate(
    permissionId,
    {
      setting: permission.setting,
      chat: permission.chat,
      news: permission.news
    },
    { new: true }
  )
    .then(userAuth => {
      console.log(userAuth);
      return res.status(200).json(userAuth);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка: ${err.message}`
      });
    });
  // console.log(req.body);
  // res.status(200).json({ user: req.body });
};
