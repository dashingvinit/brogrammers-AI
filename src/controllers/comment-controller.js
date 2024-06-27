const { StatusCodes } = require('http-status-codes');
const { CommentService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function getById(req, res) {
  try {
    const data = await CommentService.getById(req.params.blogId);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createComment(req, res) {
  try {
    const data = await CommentService.createComment(req.params.id, req.body);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createDiscussion(req, res) {
  try {
    const data = await CommentService.createDiscussion(req.params.id, req.body);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function addReply(req, res) {
  try {
    const data = await CommentService.addReply(req.params.commentId, req.body);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function deleteComment(req, res) {
  try {
    const data = await CommentService.deleteComment(
      req.params.blogId,
      req.params.commentId
    );
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getById,
  createComment,
  createDiscussion,
  addReply,
  deleteComment,
};
