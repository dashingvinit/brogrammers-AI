const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const { ProductServices, OpenAIService } = require('../services');
const {S3} = require('../config')

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
    const product = await ProductServices.claimProduct(
      req.body.id,
      req.body.data
    );
    successResponse.data = product;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getSignedUrl(req,res){
  try {
    const url = await S3.getSignedFileUrl(req.body.fileName);
    const updates = await ProductServices.
    return url;
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function findProduct(req, res) {
  try {
    console.log("hello world")
    res.status("ok")
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
