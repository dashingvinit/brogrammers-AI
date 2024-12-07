const { StatusCodes } = require('http-status-codes');
const { CourseService, OpenAIService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const LangChainService = require('../langchain/course-service');

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
    const { userId, title, level, language, depth, doc } = req.body;

    if (!userId || !title || !level || !language || !depth) {
      throw new AppError('All fields are required', StatusCodes.BAD_REQUEST);
    }

    let units, keyNotes;
    if (doc === 'true') {
      ({ units, keyNotes } = await LangChainService.saveCourse(userId, title));
      if (!keyNotes) return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
      units = units.units;
    } else {
      units = await OpenAIService.getRoadMap(title, depth, level, language);
    }

    const course = { userId, title, units, level, depth, language, keyNotes };
    const data = await CourseService.createCourse(course);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
}

async function getAnswer(req, res) {
  try {
    const { userId, title, input } = req.body;
    const answer = await LangChainService.getAnswer(userId, title, input);
    console.log('Controller', answer);
    successResponse.data = answer;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function getKeyNote(req, res) {
  try {
    let { courseId, title } = req.params;
    const keyNotes = await OpenAIService.getKeyNotes(title);
    const course = await CourseService.updateCourse(courseId, { keyNotes });
    successResponse.data = course;
    return res.status(StatusCodes.OK).json(successResponse);
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
  getKeyNote,
  getAnswer,

  createCourse,
  updateCourse,
  updateCourseObject,

  deleteCourse,
};
