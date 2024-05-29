const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const recentSchema = new Schema({
  courseId: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  ],
});

module.exports = mongoose.model('Recent', recentSchema);
