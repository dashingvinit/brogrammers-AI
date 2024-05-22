const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true }, // Markdown text
  suggestedVideos: [{ type: String }], // Array of suggested video URLs
  topicVideo: { type: String }, // URL of the topic video
});

const unitSchema = new Schema({
  title: { type: String, required: true },
  syllabus: {
    type: String,
    required: true,
  },
  handwrittenNotes: { type: String },
  detailedNotes: { type: String },
  youtubeVideos: [{ type: String }],
  topics: [topicSchema], // Array of topics using the topicSchema
});

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

const courseSchema = new Schema({
  title: { type: String, required: true },
  units: [unitSchema],
  aiGeneratedQuizzes: [aiGeneratedQuizSchema],
  worksheets: [{ title: { type: String } }],
});

module.exports = mongoose.model('Course', courseSchema);
