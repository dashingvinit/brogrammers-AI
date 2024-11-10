const { SolutionRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const solutionRepository = new SolutionRepository();

async function get(id) {
  try {
    return null;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot update blind sheet', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function patch(id, data) {
  try {
    return null;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot update blind sheet', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = { get, patch };
