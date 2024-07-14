const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const { instance, serverConfig } = require('../config');
const crypto = require('crypto');

async function getKey(req, res) {
  try {
    const data = await serverConfig.R_KEY_ID;
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
    const options = {
      amount: Number(req.body.price * 100),
      currency: 'INR',
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
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', serverConfig.R_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthenticated = expectedSignature === razorpay_signature;
    if (isAuthenticated)
      res.redirect(
        `https://brogrammers.in/payment?reference=${razorpay_payment_id}`
      );
    else throw error;
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
  checkOut,
  verify,
  getKey,
};
