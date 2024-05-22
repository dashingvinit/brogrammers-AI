const { StatusCodes } = require('http-status-codes');
const { BlogService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function getBlogs(req, res) {
  try {
    const blogs = await BlogService.getBlogs();
    successResponse.data = blogs;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
  getBlogs,
};
