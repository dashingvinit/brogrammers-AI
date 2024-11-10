const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  URL: process.env.MONGO_URI,
  PORT: process.env.PORT || 7000,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
  //llm keys
  GEMINI_KEY: process.env.GEMINI_KEY,
  OPENAI_KEY: process.env.OPENAI_API_KEY,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,

  //authentication
  CLERK_KEY: process.env.CLERK_KEY,
  CLERK_KEY_PRO: process.env.CLERK_KEY_PRO,
  //razor pay
  R_KEY_ID: process.env.KEY_ID,
  R_KEY_SECRET: process.env.KEY_SECRET,
  //S3 stuff
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_S3_BUCKET,
};
