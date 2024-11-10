const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  qs_id: { require: true, type: String },
  title: { require: true, type: String },
  difficulty: { require: true, type: String },
  statement: { require: true, type: String },
  explanation: { require: true, type: String },
  examples: [
    {
      input: { require: true, type: String },
      output: { require: true, type: String },
      explanation: { require: true, type: String },
    },
  ],
  topic_tags: [{ type: String }],
  brute_sol: {
    java: { type: String },
    cpp: { type: String },
    python: { type: String },
  },
  optimal_sol: {
    java: { type: String },
    cpp: { type: String },
    python: { type: String },
  },
});

module.exports = new mongoose.model('Problem', problemSchema);
