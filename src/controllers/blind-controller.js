const { StatusCodes } = require('http-status-codes');
const { BlindServices } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function get(req, res) {
  try {
    const data = await BlindServices.get(req.params.id);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function patch(req, res) {
  try {
    const data = await BlindServices.patch(req.params.id, req.params.qs);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  get,
  patch,
};
