const { StatusCodes } = require('http-status-codes');
const { TopicService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const { OpenAIService } = require('../services');

async function getTopic(req, res) {
  try {
    let topic = await TopicService.getTopic(
      req.params.courseId,
      req.params.title
    );
    if (!topic) {
      throw new Error('Cannot find topic');
    }
    successResponse.data = topic;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    if (error.message === 'Cannot find topic') {
      try {
        topic = await OpenAIService.getTopic(
          req.params.courseId,
          req.params.subject,
          req.params.title
        );
        successResponse.data = topic;
        return res.status(StatusCodes.OK).json(successResponse);
      } catch (openAIError) {
        errorResponse.error = openAIError;
        return res.status(openAIError.statusCode).json(errorResponse);
      }
    } else {
      errorResponse.error = error;
      return res.status(error.statusCode).json(errorResponse);
    }
  }
}

async function deleteTopic(req, res) {
  try {
    const topic = await TopicService.getTopic(
      req.params.courseId,
      req.params.title
    );
    if (!topic) {
      throw new Error('Cannot find topic');
    }
    const deletedTopic = await TopicService.deleteTopic(topic._id);
    successResponse.data = deletedTopic;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'An error occurred while deleting the topic',
    });
  }
}

async function updateTopic(req, res) {
  // Implement updateUnit functionality
}

module.exports = {
  getTopic,
  //   updateTopic,
  deleteTopic,
};
