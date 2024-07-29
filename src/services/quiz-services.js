const { QuizRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const quizRepository = new QuizRepository();

async function getQuiz(courseId, title) {
  try {
    const quiz = await quizRepository.getByCourse(courseId);
    return quiz;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find quiz', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function createQuiz(data) {
  try {
    const quiz = await quizRepository.create(data);
    return quiz;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot create quiz', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getQuiz,
  createQuiz,
};
