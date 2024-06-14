const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementStory' },
  author: { type: String, ref: 'User' },
  comment: { type: String, required: true },
  createdDate: Date,
  likes: Number,
  replies: [
    {
      user: { type: String, ref: 'User' },
      content: String,
      createdDate: Date,
      likes: Number,
    },
  ],
});

module.exports = mongoose.model('Comments', commentsSchema);
