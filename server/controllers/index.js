const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const uuidv4 = require('uuid/v4');

// module.exports.token = (req, res, next) => {
//   // const token = req.cookies.token;
//   // console.log('sad');
//   res.json({ asd: '123' });
// };

module.exports.token = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  if (!!token && !req.isAuthenticated()) {
    var request = require('request');

    request.post(
      'http://localhost:3000/api/authFromToken',
      { json: { key: 'value' } },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body);
          // return done(null, body);
        }
      }
    );
    User.findOne({ token }).then(user => {
      if (user) {
        req.logIn(user, err => {
          if (err) next(err);
        });
      }
      next();
    });
  } else {
    next();
  }
};

module.exports.login = function(req, res, next) {
  // console.log(req.body);
  // const aaa = JSON.parse(req.body);
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.json(user);
    }
    if (!user) {
      return res.json(user);
      // return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json(user);
      }
      if (req.body.remember) {
        const token = uuidv4();
        user.setToken(token);
        user.save().then(user => {
          res.cookie('token', token, {
            maxAge: 7 * 60 * 60 * 1000,
            path: '/',
            httpOnly: true
          });
          return res.json(user);
          // return res.redirect('/profile');
        });
      } else {
        return res.json(user);
        // return res.redirect('/profile');
      }
    });
  })(req, res, next);
};

module.exports.saveNewUser = (req, res, next) => {
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
