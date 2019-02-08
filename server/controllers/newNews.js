const News = require('../models/news');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');

module.exports = (req, res, next) => {
  const { date, theme, text, userId } = req.body;
  const token = uuidv4();

  User.findOne({ id: userId })
    .then(users => {
      const newNews = new News({
        id: token,
        date: date,
        theme: theme,
        text: text,
        userId: userId,
        user: users._id
      });

      return newNews.save();
    })
    .then(() => {
      return News.find({}).populate('user');
    })
    .then(news => {
      return res.status(200).json(news);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка при добавлении новости: ${err.message}`
      });
    });
};
