const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aiGeneratedQuizSchema = new Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correctOption: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Quiz', aiGeneratedQuizSchema);
