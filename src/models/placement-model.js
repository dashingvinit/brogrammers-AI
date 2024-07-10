const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placementStorySchema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  studentName: { type: String, required: true },
  academicBackground: { type: String, required: true },
  cgpa: { type: String },
  jobRole: { type: String, required: true },
  companyName: { type: String, required: true },
  package: { type: String },
  title: { type: String, required: true },
  interviewProcess: [
    {
      stage: { type: String },
      description: { type: String },
      notes: String,
    },
  ],
  preparationTips: [{ tip: { type: String } }],
  personalExperience: { type: String, required: true },
  resourcesUsed: [
    {
      resourceName: { type: String },
      resourceLink: String,
    },
  ],
  instagram: { type: String },
  tweeter: { type: String },
  linkedIn: { type: String },
  site: { type: String },
  markdown: { type: Schema.Types.Mixed },
  likes: [{ userId: { type: String, ref: 'User' } }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  submissionDate: { type: Date, default: Date.now },
  createdAt: { type: Date, required: true, index: true },
});

module.exports = mongoose.model('PlacementStory', placementStorySchema);
