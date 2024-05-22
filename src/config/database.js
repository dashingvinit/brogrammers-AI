const mongoose = require('mongoose');
const { URL } = require('./server-config');

const connect = async () => {
  await mongoose.connect(URL, {});
};

module.exports = {
  connect,
};
