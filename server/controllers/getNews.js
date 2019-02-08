const News = require('../models/news');

module.exports = (req, res, next) => {
  News.find({})
    .populate('user')
    .then(news => {
      return res.status(200).json(news);
    })
    .catch(next);
};
