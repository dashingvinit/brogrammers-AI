const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const { Webhook } = require('svix');
const { CLERK_KEY } = require('../config/server-config');

async function webhooks(req, res) {
  try {
    const payload = req.body.toString();
    const header = req.headers;

    const wh = new Webhook(CLERK_KEY);
    const evt = wh.verify(payload, header);
    const { id, ...attributes } = evt.data;
    const eventType = evt.type;
    console.log(id, eventType);

    console.log();
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function signup(req, res) {
  const { name, email, password, role } = req.body;
  try {
    const user = await UserService.createUser({ name, email, password, role });
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
  webhooks,
  signup,
  login,
  deleteUser,
  patchUser,
};
