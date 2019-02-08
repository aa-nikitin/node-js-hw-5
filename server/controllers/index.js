const authFromToken = require('./authFromToken.js');
const login = require('./login.js');
const saveNewUser = require('./saveNewUser.js');
const getNews = require('./getNews.js');
const getUsers = require('./getUsers.js');
const updateUserPermission = require('./updateUserPermission.js');
const deleteUser = require('./deleteUser.js');
const updateUser = require('./updateUser.js');
const saveUserImage = require('./saveUserImage.js');
const newNews = require('./newNews.js');
const deleteNews = require('./deleteNews.js');
const test = require('./test.js');

module.exports = {
  authFromToken,
  login,
  saveNewUser,
  getNews,
  getUsers,
  updateUserPermission,
  deleteUser,
  updateUser,
  saveUserImage,
  newNews,
  deleteNews,
  test
};
