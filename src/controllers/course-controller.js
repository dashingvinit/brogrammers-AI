const { StatusCodes } = require('http-status-codes');
const { CourseService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const { OpenAIService } = require('../services');

async function getCourses(req, res) {
  try {
    const courses = await CourseService.getCourses();
    successResponse.data = courses;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getAdminCourses(req, res) {
  try {
    const courses = await CourseService.getAdminCourses();
    successResponse.data = courses;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Cannot find the course',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCourse(req, res) {
  try {
    const course = await CourseService.getCourse(req.params.id);
    successResponse.data = course;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getRecent(req, res) {
  try {
    const course = await CourseService.getRecent(req.params.id);
    successResponse.data = course;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function createCourse(req, res) {
  try {
    await new Promise((resolve) => {
      if (req.readableEnded) resolve();
      else req.on('end', resolve);
    });
    const { userId, title, units, syllabus } = req.body;
    // console.log(userId, title, units, syllabus);
    let data = null;
    if (units == null || units == 'undefined' || units[0].name == '')
      data = await OpenAIService.getRoadMap(title, syllabus, userId);
    else
      data = await CourseService.createCourse({
        userId,
        title,
        units,
      });
    successResponse.data = data;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const updates = req.body;
    const course = await CourseService.updateCourse(courseId, updates);
    successResponse.data = course;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function deleteCourse(req, res) {
  try {
    const course = await CourseService.deleteCourse(req.params.id);
    successResponse.data = course;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
  //course
  getCourses,
  getAdminCourses,
  getCourse,
  getRecent,

  createCourse,
  updateCourse,
  deleteCourse,
};
