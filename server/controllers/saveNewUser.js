// const mongoose = require('mongoose');
// const User = mongoose.model('user');
const { User } = require('../models/user');
const { Permission } = require('../models/permission');
const uuidv4 = require('uuid/v4');
const jwt = require('jwt-simple');
const secret = require('../config/config.json').secret;

module.exports = (req, res, next) => {
  const {
    username,
    surName,
    firstName,
    middleName,
    password,
    permission
  } = req.body;
  User.findOne({ username }).then(user => {
    if (user) {
      return res.json({
        error: 'Пользователь с таким логином уже существует'
      });
    } else {
      const token = uuidv4();

      const newPermission = new Permission({
        chat: permission.chat,
        news: permission.news,
        setting: permission.setting
      });

      newPermission
        .save()
        .then(perm => {
          const newUser = new User({
            id: token,
            username: username,
            surName: surName,
            firstName: firstName,
            middleName: middleName,
            permissionId: perm._id,
            permission: perm._id
            // per: perm._id
          });
          newUser.setPassword(password);
          newUser.setToken(jwt.encode({ id: token }, secret));

          newUser
            .save()
            .then(user => {
              User.findOne({ id: user.id })
                .populate('permission')
                .then(userAuth => {
                  return res.status(200).json(userAuth);
                })
                .catch(err => {
                  return res.status(400).json({
                    error: `Произошла ошибка: ${err.message}`
                  });
                });
              // return res.json(user);
            })
            .catch(next);
          // return res.json(user);
        })
        .catch(next);
    }
  });
};

// {
//   chat: {
//     C: true,
//     R: true,
//     U: true,
//     D: true
//   },
//   news: {
//     C: true,
//     R: true,
//     U: true,
//     D: true
//   },
//   setting: {
//     C: true,
//     R: true,
//     U: true,
//     D: true
//   }
// }
