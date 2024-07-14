const Razorpay = require('razorpay');
const { R_KEY_ID, R_KEY_SECRET } = require('./server-config');

const instance = new Razorpay({
  key_id: R_KEY_ID,
  key_secret: R_KEY_SECRET,
});

module.exports = {
  instance,
};
