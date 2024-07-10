const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dsaTopicSchema = new Schema({
  dsId: { type: String },
  questions: [{ problemId: { type: String } }],
});

const dsaProgressSchema = new Schema({
  userId: { type: String, ref: 'User' },
  topics: [dsaTopicSchema],
});

module.exports = mongoose.model('DSAProgress', dsaProgressSchema);
