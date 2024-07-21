const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  units: [
    {
      title: { type: String },
      time: { type: String },
      topics: [{ type: String }],
    },
  ],
  keyNotes: [{ title: { type: String }, content: { type: String } }],
  aiGeneratedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  worksheets: [{ title: { type: String }, link: { type: String } }],
  syllabus: { type: String },
  resources: [{ type: String }],
  handwrittenNotes: { type: String },
  discussion: [
    { commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } },
  ],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
