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

async function getCoursesById(req, res) {
  try {
    const courses = await CourseService.getCoursesById(req.params.id);
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
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
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
    let { userId, title, units, time } = req.body;

    if (!units || !units[0]?.name) {
      units = await OpenAIService.getRoadMap(title, time);
    }
    const keyNotes = await OpenAIService.getKeyNotes(title);
    const data = await CourseService.createCourse({
      userId,
      title,
      units,
      keyNotes,
    });

    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.error('Error creating course:', error);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        error: error.message,
      });
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const updates = req.body;
    console.log(updates);
    const course = await CourseService.updateCourse(courseId, updates);
    successResponse.data = course;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateCourseObject(req, res) {
  try {
    const courseId = req.params.id;
    const updates = req.body;
    const course = await CourseService.updateCourseObject(courseId, updates);
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
  getCoursesById,
  getAdminCourses,
  getCourse,
  getRecent,

  createCourse,
  updateCourse,
  updateCourseObject,

  deleteCourse,
};
