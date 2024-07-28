const { BasketServices } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');

async function getBaskets(req, res) {
  try {
    const data = await BasketServices.getBaskets();
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createBasket(req, res) {
  try {
    const data = await BasketServices.createBasket(req.body);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = { getBaskets, createBasket };
