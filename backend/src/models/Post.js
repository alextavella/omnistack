const mongoose = require('mongoose');

const config = {
  timestamps: true,
};

const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
}, config);

module.exports = mongoose.model('Post', PostSchema);
