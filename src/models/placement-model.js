const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placementStorySchema = new Schema({
  userId: { type: String, ref: 'User' },
  studentName: { type: String, required: true },
  academicBackground: { type: String, required: true },
  jobRole: { type: String, required: true },
  companyName: { type: String, required: true },
  interviewProcess: [
    {
      stage: {
        type: String,
        required: true,
      },
      questions: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      notes: String,
    },
  ],
  preparationTips: [{ tip: { type: String } }],
  personalExperience: { type: String, required: true },
  resourcesUsed: [
    {
      resourceName: {
        type: String,
        required: true,
      },
      resourceLink: String,
    },
  ],
  instagram: { type: String },
  tweeter: { type: String },
  linkedIn: { type: String },
  site: { type: String },
  markdown: { type: Schema.Types.Mixed },
  likes: [{ userId: { type: String, ref: 'User' } }],
  submissionDate: { type: Date, default: Date.now },
  createdAt: { type: Date, required: true, index: true },
});

module.exports = mongoose.model('PlacementStory', placementStorySchema);
