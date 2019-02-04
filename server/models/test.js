const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema({
  name: String
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  title: String
});

const Author = mongoose.model('Author', authorSchema);
const Story = mongoose.model('Story', storySchema);

module.exports = {
  Author,
  Story
};
