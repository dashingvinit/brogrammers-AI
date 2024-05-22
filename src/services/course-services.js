const { CourseRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const courseRepository = new CourseRepository();

async function getCourses() {
  try {
    const courses = await courseRepository.getAll();
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find courses',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCourse(id) {
  try {
    const course = await courseRepository.get(id);
    return course;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find the course',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createCourse(data) {
  try {
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
  getCourses,
  getCourse,
  createCourse,
};
