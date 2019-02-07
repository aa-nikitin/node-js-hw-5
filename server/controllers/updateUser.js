const User = require('../models/user');
const bCrypt = require('bcryptjs');

module.exports = (req, res, next) => {
  const { id } = req.body;
  const getUpdateUserData = async (pass, oldPass) => {
    if (pass && oldPass) {
      const salt = await bCrypt.genSalt(10);
      const password = await bCrypt.hash(pass, salt);
      const currentUser = await User.findOne({ id: id });

      if (!currentUser.validPassword(oldPass)) {
        throw new Error(`Неправильный пароль!`);
      }
      return password;
    }
  };

  User.findOne({ id: id })
    .populate('permission')
    .then(user => {
      const { oldPassword, password } = req.body;

      getUpdateUserData(password, oldPassword)
        .then(pass => {
          const hash = { hash: pass };
          const userNew = Object.assign(user, req.body, hash);
          User.updateOne({ id: id }, userNew, { new: true })
            .then(() => {
              return res.status(200).json(user);
            })
            .catch(err => {
              return res.status(400).json({
                error: `Произошла ошибка: ${err.message}`
              });
            });
        })
        .catch(err => {
          return res
            .status(400)
            .json({ error: `Произошла ошибка: ${err.message}` });
        });
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка: ${err.message}`
      });
    });
};
