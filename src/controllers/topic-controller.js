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

async function updateTopic(req, res) {
  // Implement updateUnit functionality
}

async function deleteTopic(req, res) {
  // Implement deleteUnit functionality
}

module.exports = {
  getTopic,
  //   updateTopic,
  //   deleteTopic,
};
