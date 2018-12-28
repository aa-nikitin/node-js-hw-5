const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

require('./models');

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (typeof req.body === 'string') req.body = JSON.parse(req.body);
  next();
});

app.use(cookieParser());

require('./config/config-passport');

app.use(express.static(path.join(process.cwd(), 'dist')));

app.use('/api', require('./routes'));

app.listen(PORT);
console.log('Server is running on port ' + PORT);
