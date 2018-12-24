const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://user:qqqq0000@ds139944.mlab.com:39944/portal',
  { useNewUrlParser: true }
);
require('./user');
mongoose.connection.on('connected', () => {
  console.log(
    'Mongoose connection open mongodb://user:qqqq0000@ds139944.mlab.com:39944/portal'
  );
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected app termination');
    process.exit(0);
  });
});
