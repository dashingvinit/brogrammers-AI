const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    imageUrl: { type: String },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    recentlyViewed: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
    bookMarks: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementStory' },
    ],
    recentBlog: [
      {
        blog: { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementStory' },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// firing a function before saving a document
userSchema.pre('save', async function (next) {
  try {
    if (this.password && this.password !== 'undefined') {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
