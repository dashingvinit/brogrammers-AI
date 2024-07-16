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
    phone: { type: Number },
    imageUrl: { type: String },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    premium: {
      isActive: { type: Boolean, default: false },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    paymentDetails: {
      razorpay_order_id: { type: String },
      razorpay_payment_id: { type: String },
      razorpay_signature: { type: String },
    },
    trial: {
      isActive: { type: Boolean, default: true },
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

// Add a virtual field for premium validity check
userSchema.virtual('premium.isValid').get(function () {
  return this.premium.endDate ? this.premium.endDate > new Date() : false;
});

module.exports = mongoose.model('User', userSchema);
