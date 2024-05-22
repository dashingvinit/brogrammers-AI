const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await UserService.createUser({ name, email, password });
    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const data = { email, password };
  try {
    const user = await UserService.loginUser(data);
    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserService.deleteUser(req.params.id);
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function patchUser(req, res) {
  try {
    const { email, password, name } = req.body;
    const data = { email, password, name };
    const user = await UserService.patchUser(req.params.id, data);
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
  signup,
  login,
  deleteUser,
  patchUser,
};
