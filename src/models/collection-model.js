const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  title: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Collection', collectionSchema);
