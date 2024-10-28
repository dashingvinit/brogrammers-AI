const { ProductRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { S3 } = require('../config');

const productRepository = new ProductRepository();

async function getProduct() {
  try {
    const baskets = await productRepository.getAll();
    return baskets.reverse();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot get products', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function createProduct(data) {
  try {
    const product = await productRepository.create(data);
    return product;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot create object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function claimProduct(id, data) {
  try {
    const product = await productRepository.update(id, data);
    return product;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot claim object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getSignedUrl(data, format) {
  try {
    let parts = format.split('/');
    let ext = parts[1];
    let type = parts[0];
    const fileName = `product/${data}_${type}.${ext}`;

    const uploadUrl = await S3.putSignedFileUrl(fileName, format);
    const dbLink = await S3.getSignedFileUrl(fileName);

    return { uploadUrl, dbLink };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot claim object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = { getProduct, createProduct, claimProduct, getSignedUrl };
