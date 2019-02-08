const News = require('../models/news');

module.exports = (req, res, next) => {
  News.findOneAndDelete({ id: req.params.id })
    .then(() => {
      return News.find({}).populate('user');
    })
    .then(news => {
      return res.status(200).json(news);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка при удалении новости: ${err.message}`
      });
    });
};
