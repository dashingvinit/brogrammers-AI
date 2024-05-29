const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: { type: String, required: true },
  markdownText: { type: String, required: true },
  suggestedVideos: [{ type: String }],
  topicVideo: { type: String },
});

module.exports = mongoose.model('Topic', topicSchema);
