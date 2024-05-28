const { CourseRepository, UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const courseRepository = new CourseRepository();
const userRepository = new UserRepository();

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

async function getAdminCourses() {
  try {
    const users = await userRepository.getAllAdmin();
    const userIds = users.map((user) => user._id);
    const courses = await courseRepository.getAllByIds(userIds);
    return courses;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find the course',
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
    const course = await courseRepository.create({
      title: data.title,
      userId: data.userId,
      units: data.units,
    });
    return course;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create a new Course object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCourse(id, updates) {
  try {
    const course = await courseRepository.get(id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (updates.title) {
      course.title = updates.title;
    }
    if (updates.syllabus) {
      course.syllabus = updates.syllabus;
    }

    const updatedCourse = await courseRepository.update(id, course);
    return updatedCourse;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot update a new Course object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCourse(id) {
  try {
    const course = await courseRepository.destroy(id);
    if (!course) {
      throw new AppError(
        'no user exist for the given userId',
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {}
}

module.exports = {
  getCourses,
  getAdminCourses,
  getCourse,

  createCourse,
  updateCourse,
  deleteCourse,
};
