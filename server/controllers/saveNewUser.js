// const mongoose = require('mongoose');
// const User = mongoose.model('user');
const User = require('../models/user');
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
      const newUser = new User();
      newUser.id = token;
      newUser.username = username;
      newUser.surName = surName;
      newUser.firstName = firstName;
      newUser.middleName = middleName;
      newUser.setPassword(password);
      newUser.permission = permission;
      newUser.setToken(jwt.encode({ id: token }, secret));
      newUser
        .save()
        .then(user => {
          return res.json(user);
        })
        .catch(next);
    }
  });
};
