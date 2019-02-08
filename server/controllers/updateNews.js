const News = require('../models/news');

module.exports = (req, res, next) => {
  const { id } = req.body;
  News.updateOne({ id: id }, req.body, { new: true })
    .then(() => {
      return News.find({}).populate('user');
    })
    .then(news => {
      return res.status(200).json(news);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка: ${err.message}`
      });
    });
};
