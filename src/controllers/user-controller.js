const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const { Webhook } = require('svix');
const { CLERK_KEY, CLERK_KEY_PRO } = require('../config/server-config');

async function webhooks(req, res) {
  try {
    const payloadString = JSON.stringify(req.body);
    const svixHeaders = req.headers;

    const wh = new Webhook(CLERK_KEY);
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    const _id = id;
    const email = attributes.email_addresses?.[0]?.email_address;
    const name = `${attributes.first_name} ${attributes.last_name}`;
    const imageUrl = attributes.image_url;

    let user = null;
    // Handle the webhooks
    if (eventType === 'user.created') {
      user = await UserService.createUser({
        _id,
        name,
        email,
        imageUrl,
      });
    }
    if (eventType === 'user.deleted') {
      user = await UserService.deleteUser(_id);
    }
    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function webhooksTest(req, res) {
  try {
    const payloadString = JSON.stringify(req.body);
    const svixHeaders = req.headers;

    const wh = new Webhook(CLERK_KEY_PRO);
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    const _id = id;
    const email = attributes.email_addresses?.[0]?.email_address;
    const name = `${attributes.first_name} ${attributes.last_name}`;
    const imageUrl = attributes.image_url;

    let user = null;
    // Handle the webhooks
    if (eventType === 'user.created') {
      user = await UserService.createUser({
        _id,
        name,
        email,
        imageUrl,
      });
    }
    if (eventType === 'user.deleted') {
      user = await UserService.deleteUser(_id);
    }
    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function getUser(req, res) {
  const userId = req.params.userId;
  try {
    const user = await UserService.getUser(userId);
    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
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

async function updateRecent(req, res) {
  try {
    const { userId, courseId } = req.params;
    const user = await UserService.viewCourse(userId, courseId);
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateContinue(req, res) {
  try {
    const { userId, blogId } = req.params;
    const user = await UserService.updateContinue(userId, blogId);
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateBookmarked(req, res) {
  try {
    const { userId, blogId } = req.params;
    const user = await UserService.updateBookmarked(userId, blogId);
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateSubscription(req, res) {
  try {
    const { userId, active, startDate, endDate } = req.body;
    const user = await UserService.activatePremium(
      userId,
      active,
      startDate,
      endDate
    );
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
  webhooks,
  webhooksTest,
  getUser,
  signup,
  login,
  deleteUser,
  patchUser,
  updateRecent,
  updateContinue,
  updateBookmarked,
  updateSubscription,
};
