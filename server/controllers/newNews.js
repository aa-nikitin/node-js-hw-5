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

      newNews
        .save()
        .then(() => {
          News.find({})
            .populate('user')
            .then(news => {
              return res.status(200).json(news);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};
