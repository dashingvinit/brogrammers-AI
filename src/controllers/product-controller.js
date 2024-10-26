const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const { ProductServices, OpenAIService } = require('../services');

async function getProduct(req, res) {
  try {
    const products = await ProductServices.getProduct();
    successResponse.data = products;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createProduct(req, res) {
  try {
    const product = await ProductServices.createProduct(req.body);
    successResponse.data = product;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function claimProduct(req, res) {
  try {
    const product = await ProductServices.claimProduct(req.body.id, req.body.data);
    successResponse.data = product;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getSignedUrl(req, res) {
  try {
    const body = req.body;
    const data = await ProductServices.getSignedUrl(body.data, body.format);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function findProduct(req, res) {
  try {
    console.log('hello world');
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getProduct,
  createProduct,
  claimProduct,
  findProduct,
  getSignedUrl,
};
