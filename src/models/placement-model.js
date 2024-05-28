const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placementStorySchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  academicBackground: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
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
  preparationTips: [
    {
      tip: {
        type: String,
        required: true,
      },
    },
  ],
  personalExperience: {
    type: String,
    required: true,
  },
  resourcesUsed: [
    {
      resourceName: {
        type: String,
        required: true,
      },
      resourceLink: String,
    },
  ],
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const PlacementStory = mongoose.model('PlacementStory', placementStorySchema);

module.exports = PlacementStory;
