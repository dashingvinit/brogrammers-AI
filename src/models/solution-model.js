const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  userId: { ref: 'User', require: true, type: String },
  qs_id: { require: true, type: String },
  memory: [{ type: String }],
  feedback: { type: String },
  hintsUsed: { type: Number, default: 0 },
  attempt_count: { type: Number, default: 1 },
  complexity_details: { time: String, space: String },
});

module.exports = new mongoose.model('Solution', solutionSchema);
