const { Author, Story } = require('../models/test');

const testPost = (req, res, next) => {
  const { nameAutor, nameStory } = req.body;

  const newAuthor = new Author({
    name: nameAutor
  });

  newAuthor
    .save()
    .then(autor => {
      const newStory = new Story({
        title: nameStory,
        author: autor._id
      });

      newStory
        .save()
        .then(story => {
          return res.json(story);
        })
        .catch(next);
    })
    .catch(next);
};

const testGet = (req, res, next) => {
  Story.find({})
    .populate('author')
    .then(story => {
      return res.status(200).json(story);
    })
    .catch(err => {
      return res.status(400).json({
        error: `Произошла ошибка: ${err.message}`
      });
    });
  // Story.findOne({ title: 'Bob goes sledding' })
  //   .populate('author') //подменяет идентификатор автора информацией об авторе!
  //   .exec(function(err, story) {
  //     if (err) return handleError(err);
  //     return res.json(story);
  //     // console.log('The author is %s', story.author.name);
  //     // выводит "The author is Bob Smith"
  //   });
};

module.exports = {
  testPost,
  testGet
};
