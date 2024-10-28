const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  qs_id: { require: true, type: String },
  question: { require: true, type: String },
  topic_tags: [{ type: String }],
  brute_sol: { type: String },
  optimal_sol: { type: String },
});

module.exports = new mongoose.model('Problem', problemSchema);
