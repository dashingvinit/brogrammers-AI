const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
  aiGeneratedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  worksheets: [{ title: { type: String } }],
  handwrittenNotes: { type: String },
  detailedNotes: { type: String },
});

module.exports = mongoose.model('Course', courseSchema);
