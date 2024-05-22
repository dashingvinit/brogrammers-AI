const { StatusCodes } = require('http-status-codes');
const { BlogRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const blogRepository = new BlogRepository();

async function getBlogs() {
  try {
    const blogs = await blogRepository.getAll();
    return blogs;
  } catch (error) {
    throw new AppError(
      'Something went wrong while fetching blogs',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getBlog(id) {
  try {
    const blog = await blogRepository.get(id);
    return blog;
  } catch (error) {
    throw new AppError(
      'Something went wrong while fetching blog',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteBlog(id) {
  try {
    const blog = await blogRepository.destroy(id);
    return blog;
  } catch (error) {
    throw new AppError(
      'Something went wrong while deleting blog',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getBlogs,
  getBlog,
  deleteBlog,
};
