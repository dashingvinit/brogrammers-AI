const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  URL: process.env.MONGO_URI,
  PORT: process.env.PORT || 7000,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_KEY: process.env.GEMINI_KEY,
  CLERK_KEY: process.env.CLERK_KEY,
};
