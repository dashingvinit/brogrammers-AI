const mongoose = require('mongoose');
const { isURL } = require('validator');

// Define a sub-schema for courses
const courseSchema = new mongoose.Schema({
  courseID: { type: String, required: true },
  count: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

// Define a sub-schema for projects
const projectSchema = new mongoose.Schema({
  projectID: { type: String, required: true },
  count: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  university: { type: String, trim: true },
  bio: { type: String, trim: true },
  resume: { type: String, trim: true },
  instagram: {
    type: String,
    validate: {
      validator: (value) =>
        isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  twitter: {
    type: String,
    validate: {
      validator: (value) =>
        isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  linkedin: {
    type: String,
    validate: {
      validator: (value) =>
        isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  github: {
    type: String,
    validate: {
      validator: (value) =>
        isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  leetcode: {
    type: String,
    validate: {
      validator: (value) =>
        isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  courses: [courseSchema],
  projects: [projectSchema],
});

module.exports = mongoose.model('Profile', profileSchema);
