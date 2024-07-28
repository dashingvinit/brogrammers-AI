const { BasketRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const basketRepository = new BasketRepository();

async function getBaskets() {
  try {
    const baskets = await basketRepository.getAll();
    return baskets;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find courses',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createBasket(data) {
  try {
    const basket = await basketRepository.create(data);
    return basket;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create a new Course object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getBaskets,
  createBasket,
};
