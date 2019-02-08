const Permission = require('../models/permission');

module.exports = (req, res, next) => {
  const { permissionId, permission } = req.body;
  Permission.findById(permissionId)
    .then(permissionOld => {
      return Permission.findByIdAndUpdate(
        permissionId,
        {
          setting: Object.assign(permissionOld.setting, permission.setting),
          chat: Object.assign(permissionOld.chat, permission.chat),
          news: Object.assign(permissionOld.news, permission.news)
        },
        { new: true }
      );
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка при загрузке изображения: ${err.message}`
      });
    });
};
