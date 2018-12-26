const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// --
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

require('./models');

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log(req.body);
  if (typeof req.body === 'string') req.body = JSON.parse(req.body);
  // console.log(req.body);
  next();
});

app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: 'key-secret',
    key: 'access_token',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 30 * 60 * 1000
    },
    saveUninitialized: false,
    resave: true,
    ephemeral: true,
    rolling: true
  })
);

require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(process.cwd(), 'dist')));

app.use('/api', require('./routes'));

app.listen(PORT);
console.log('Server is running on port ' + PORT);
