const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aiGeneratedQuizSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      ans: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Quiz', aiGeneratedQuizSchema);
