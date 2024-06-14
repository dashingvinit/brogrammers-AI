const { StatusCodes } = require('http-status-codes');
const { CollectionService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function getCollectionByTitle(req, res) {
  try {
    const data = await CollectionService.getCollectionByTitle(req.params.title);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createCollection(req, res) {
  try {
    const { userId, title } = req.params;
    const data = await CollectionService.createCollection({ userId, title });
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function updateCollection(req, res) {
  try {
    const id = req.params.id;
    const courseId = req.body.courseIds;
    const data = await CollectionService.updateCollection(id, courseId);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getCollectionByTitle,
  createCollection,
  updateCollection,
};
