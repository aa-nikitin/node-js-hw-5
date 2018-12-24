// const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const uuidv4 = require('uuid/v4');

module.exports.saveNewUser = (req, res, next) => {
  const {
    username,
    surName,
    firstName,
    middleName,
    password,
    permission
  } = JSON.parse(req.body);
  User.findOne({ username }).then(user => {
    if (user) {
      return res.json({
        message: 'Пользователь с таким логином уже существует'
      });
    } else {
      const newUser = new User();
      const token = uuidv4();
      newUser.username = username;
      newUser.surName = surName;
      newUser.firstName = firstName;
      newUser.middleName = middleName;
      newUser.setPassword(password);
      newUser.permission = permission;
      newUser.setToken(token);
      newUser
        .save()
        .then(user => {
          req.logIn(user, err => {
            if (err) next(err);
            return res.json(user);
          });
        })
        .catch(next);
    }
  });
};
