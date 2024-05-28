const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  markdownText: { type: String, required: true },
  suggestedVideos: [{ type: String }],
  topicVideo: { type: String },
});

module.exports = mongoose.model('Topic', topicSchema);
