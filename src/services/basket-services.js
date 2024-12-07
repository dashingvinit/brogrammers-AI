const { BasketRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const basketRepository = new BasketRepository();

async function getBaskets() {
  try {
    const baskets = await basketRepository.getAll();
    return baskets.reverse();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find basket', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getById(id) {
  try {
    if (!id) throw new AppError('Id is required', StatusCodes.BAD_REQUEST);
    const basket = await basketRepository.get(id);
    return basket;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot find basket', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function createBasket(data) {
  try {
    if (!data) throw new AppError('Data is required', StatusCodes.BAD_REQUEST);
    const basket = await basketRepository.create(data);
    return basket;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot create a new Course object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getBaskets,
  getById,
  createBasket,
};
