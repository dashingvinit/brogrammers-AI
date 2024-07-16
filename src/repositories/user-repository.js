const CrudRepository = require('./crud-repository');
const User = require('../models/user-model');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      email: email,
    });
    return user;
  }

  async getAllAdmin() {
    const admins = await User.find({ role: 'admin' });
    return admins;
  }

  async getPopulate(id) {
    const populated = await User.findById(id).populate('recentlyViewed.course');
    return populated;
  }

  async getContinue(id) {
    const populated = await User.findById(id).populate('recentBlog.blog');
    return populated;
  }

  async getBookmarked(id) {
    const populated = await User.findById(id).populate('bookMarks');
    return populated;
  }

  async removeRecentlyViewed(courseId) {
    const result = await User.updateMany(
      {},
      { $pull: { recentlyViewed: { course: courseId } } }
    );
    return result;
  }

  async updateTrialStatus(userId) {
    const result = await User.findByIdAndUpdate(userId, {
      'trial.isActive': false,
    });
    return result;
  }

  async activatePremium(
    userId,
    active,
    startDate,
    endDate,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  ) {
    // Construct the update object
    const updateFields = {
      'premium.isActive': active,
      'premium.startDate': startDate,
      'premium.endDate': endDate,
    };

    // Conditionally add payment details if they are provided
    if (razorpayOrderId && razorpayPaymentId && razorpaySignature) {
      updateFields['paymentDetails.razorpay_order_id'] = razorpayOrderId;
      updateFields['paymentDetails.razorpay_payment_id'] = razorpayPaymentId;
      updateFields['paymentDetails.razorpay_signature'] = razorpaySignature;
    }

    const result = await User.findByIdAndUpdate(userId, updateFields);
    return result;
  }
}

module.exports = UserRepository;
