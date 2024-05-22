const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { serverConfig } = require('../../config');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createToken(input) {
  try {
    return jwt.sign(input, serverConfig.JWT_SECRET, {
      expiresIn: serverConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// for one time link
function createTokenReset(input, pwd) {
  try {
    return jwt.sign(input, serverConfig.JWT_SECRET + pwd, {
      expiresIn: '15m',
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, serverConfig.JWT_SECRET);
  } catch (error) {
    throw error;
  }
}

function verifyTokenReset(token, pwd) {
  try {
    return jwt.verify(token, serverConfig.JWT_SECRET + pwd);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
  createTokenReset,
  verifyTokenReset,
};
