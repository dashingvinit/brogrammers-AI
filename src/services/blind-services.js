const { BlindRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const blindRepository = new BlindRepository();

async function get(id) {
  try {
    var usersheet = await blindRepository.getById(id);

    if (usersheet == null) {
      usersheet = await blindRepository.create({
        userId: id,
        problems: [],
      });
    }

    return usersheet;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot get blind sheet',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function patch(id, data) {
  try {
    const usersheet = await blindRepository.get(id);
    const qsIndex = usersheet.problems.indexOf(data);

    if (qsIndex !== -1) {
      usersheet.problems.splice(qsIndex, 1);
    } else {
      usersheet.problems.push(data);
    }

    const response = await blindRepository.update(id, usersheet);
    return response;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot update blind sheet',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { get, patch };
