const { StatusCodes } = require('http-status-codes');
const { CourseService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

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

async function createCourse(req, res) {
  // Implement createCourse functionality
}

// async function updateCourse(req, res) {
//   // Implement updateCourse functionality
// }

// async function deleteCourse(req, res) {
//   // Implement deleteCourse functionality
// }

// async function getUnits(req, res) {
//   // Implement getUnits functionality
// }

// async function getUnit(req, res) {
//   // Implement getUnit functionality
// }

// async function createUnit(req, res) {
//   // Implement createUnit functionality
// }

// async function updateUnit(req, res) {
//   // Implement updateUnit functionality
// }

// async function deleteUnit(req, res) {
//   // Implement deleteUnit functionality
// }

module.exports = {
  //course
  getCourses,
  getCourse,
  createCourse,
  //   updateCourse,
  //   deleteCourse,
  //   //units
  //   getUnits,
  //   getUnit,
  //   createUnit,
  //   updateUnit,
  //   deleteUnit,
};
