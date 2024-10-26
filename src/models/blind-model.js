const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blindSchema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  problems: [{ type: String }],
});

module.exports = mongoose.model('Blind', blindSchema);
