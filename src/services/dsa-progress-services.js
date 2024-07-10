const { DSAProgressRepositoy } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const dsaProgressRepository = new DSAProgressRepositoy();

async function getProgressById(id) {
  try {
    const progress = await dsaProgressRepository.getByID(id);
    return progress;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find progress',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateProgress(userId, dsId, problemId) {
  try {
    const progress = await dsaProgressRepository.addQuestionToTopic(
      userId,
      dsId,
      problemId
    );
    return progress;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find progress',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getProgressById,
  updateProgress,
};
