const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const { QuizService, OpenAIService } = require('../services');

async function getQuiz(req, res) {
  try {
    const quiz = await QuizService.getQuiz(
      req.params.courseId,
      req.params.title
    );
    successResponse.data = quiz;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createQuiz(req, res) {
  try {
    const { courseId, title } = req.params;
    const { prompt, topic } = req.body;

    const questions = await OpenAIService.getQnAs(title, topic, prompt);

    const quiz = await QuizService.createQuiz({
      courseId,
      title: topic,
      questions,
    });
    successResponse.data = quiz;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getQuiz,
  createQuiz,
};
