const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function(user, done) {
  console.log('111');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // var request = require('request');

  // request.post(
  //   'http://localhost:3000/api/authFromToken',
  //   { json: { key: 'value' } },
  //   function(error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //       // console.log(body);
  //       // return done(null, body);
  //     }
  //   }
  // );
  console.log('222');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    done(null, id);
  } else {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, { error: 'Неверный логин' });
          }
          if (!user.validPassword(password)) {
            return done(null, { error: 'Неверный пароль' });
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);
