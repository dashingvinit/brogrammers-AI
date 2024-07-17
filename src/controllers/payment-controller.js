const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const { instance, serverConfig } = require('../config');
const crypto = require('crypto');
const { UserService } = require('../services');

async function getKey(req, res) {
  try {
    const data = serverConfig.R_KEY_ID;
    successResponse.data = data;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function checkOut(req, res) {
  try {
    const { userId, price, duration } = req.body;
    const options = {
      amount: Number(price * 100),
      currency: 'INR',
      notes: {
        userId: userId,
        duration: duration,
        price: price,
      },
    };
    const order = await instance.instance.orders.create(options);
    successResponse.data = order;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function verify(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', serverConfig.R_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthenticated = expectedSignature === razorpay_signature;
    if (isAuthenticated) {
      // Fetch the order details to get the userId and selectedPlan from notes
      const order = await instance.instance.orders.fetch(razorpay_order_id);
      const userId = order.notes.userId;
      const duration = parseInt(order.notes.duration, 10); // duration in months

      const startDate = new Date();
      const endDate = addMonths(startDate, duration);

      await UserService.activatePremium(
        userId,
        true,
        startDate,
        endDate,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      res.redirect(
        `https://brogrammers.in/payment?reference=${razorpay_payment_id}`
      );
    } else throw error;
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  // Handle cases where day overflows month (e.g., Jan 31 + 1 month = Feb 28/29)
  if (result.getMonth() !== (date.getMonth() + months) % 12) {
    result.setDate(0); // Move to last day of the previous month
  }
  return result;
}

module.exports = {
  checkOut,
  verify,
  getKey,
};
