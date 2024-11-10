const { ProblemRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const problemRepository = new ProblemRepository();

async function getProblem(id) {
  try {
    const data = await problemRepository.getQs(id);
    return data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot update blind sheet', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function patchProblem(id, data) {
  try {
    const data = await problemRepository.update(id, data);
    return data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot update blind sheet', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = { getProblem, patchProblem };
