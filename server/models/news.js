const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('news', newsSchema);
