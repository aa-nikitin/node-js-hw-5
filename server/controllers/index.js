const authFromToken = require('./authFromToken.js');
const login = require('./login.js');
const saveNewUser = require('./saveNewUser.js');
const getNews = require('./getNews.js');
const getUsers = require('./getUsers.js');
const updateUserPermission = require('./updateUserPermission.js');
const test = require('./test.js');

module.exports = {
  authFromToken,
  login,
  saveNewUser,
  getNews,
  getUsers,
  updateUserPermission,
  test
};
