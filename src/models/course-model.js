const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true }, // Made `required` true as well
  topics: [{ type: String, required: true }], // Each topic is required
});

const courseSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  units: {
    type: [unitSchema],
    validate: [arrayLimit, 'Units array cannot be empty'],
    required: true,
  },
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

function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model('Course', courseSchema);
