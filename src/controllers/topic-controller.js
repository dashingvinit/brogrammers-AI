const { StatusCodes } = require('http-status-codes');
const { TopicService, OpenAIService, CourseService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const { getAnswer } = require('../langchain/course-service');

async function getTopic(req, res) {
  try {
    const topic = await TopicService.getTopic(req.params.courseId, req.params.title);
    if (topic) {
      return res.status(StatusCodes.OK).json({ data: topic });
    }
    const course = await CourseService.getCourse(req.params.courseId);
    const context = await getAnswer(course.userId, course.title, req.params.title);
    const generatedTopic = await OpenAIService.getTopic(
      req.params.courseId,
      course.title,
      req.params.title,
      course.language,
      course.depth,
      context
    );
    return res.status(StatusCodes.OK).json({ data: generatedTopic });
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function deleteTopic(req, res) {
  try {
    const topic = await TopicService.getTopic(req.params.courseId, req.params.title);
    if (!topic) {
      throw new Error('Cannot find topic');
    }
    const deletedTopic = await TopicService.deleteTopic(topic._id);
    successResponse.data = deletedTopic;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateTopic(req, res) {
  try {
    const data = await OpenAIService.regernTopic(req.body.prompt);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
  getTopic,
  deleteTopic,
  updateTopic,
};
