const { StatusCodes } = require('http-status-codes');
const { DSAProgressServices } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function getProgressById(req, res) {
  try {
    const progress = await DSAProgressServices.getByID(req.body.userId);
    successResponse.data = progress;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function updateProgress(req, res) {
  try {
    const { userId, dsId, problemId } = req.body;

    const data = await DSAProgressServices.updateProgress(
      userId,
      dsId,
      problemId
    );
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getProgressById,
  updateProgress,
};
