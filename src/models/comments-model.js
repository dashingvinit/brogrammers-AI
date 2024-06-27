const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String, ref: 'User' },
  comment: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  likes: { type: String, ref: 'User' },
  replies: [
    {
      author: { type: String, ref: 'User' },
      comment: String,
      createdDate: { type: Date, default: Date.now },
      likes: { type: String, ref: 'User' },
    },
  ],
});

module.exports = mongoose.model('Comment', commentSchema);
