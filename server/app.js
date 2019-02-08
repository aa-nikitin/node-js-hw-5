const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const chat = require('./chat');

chat(io);

require('./models');

app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (typeof req.body === 'string') req.body = JSON.parse(req.body);
  next();
});

app.use(cookieParser());

require('./config/config-passport');

app.use('/api', require('./routes'));
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.sendFile(path.join(process.cwd(), 'server/dist/index.html'));
  }
});

app.listen(PORT);
console.log('Server is running on port ' + PORT);
