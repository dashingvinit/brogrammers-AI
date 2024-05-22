const express = require('express');
const router = express.Router();

const { CourseController } = require('../../controllers');

// Course Routes
router.get('/courses', CourseController.getCourses);
router.get('/courses/:id', CourseController.getCourse);
// router.post('/courses', CourseController.createCourse);
// router.put('/courses/:id', CourseController.updateCourse);
// router.delete('/courses/:id', CourseController.deleteCourse);

// // Unit Routes
// router.get('/courses/:courseId/units', CourseController.getUnits);
// router.get('/courses/:courseId/units/:id', CourseController.getUnit);
// router.post('/courses/:courseId/units', CourseController.createUnit);
// router.put('/courses/:courseId/units/:id', CourseController.updateUnit);
// router.delete('/courses/:courseId/units/:id', CourseController.deleteUnit);

//   getQuizzes,
//   getQuiz,
//   createQuiz,
//   updateQuiz,
//   deleteQuiz,
//   getAssignments,
//   getAssignment,
//   createAssignment,
//   updateAssignment,
//   deleteAssignment,
//   getDiscussions,
//   getDiscussion,
//   createDiscussion,
//   updateDiscussion,
//   deleteDiscussion,

// // AI-Generated Quiz Routes
// router.get('/courses/:courseId/quizzes', getQuizzes);
// router.get('/courses/:courseId/quizzes/:quizId', getQuiz);
// router.post('/courses/:courseId/quizzes', createQuiz);
// router.put('/courses/:courseId/quizzes/:quizId', updateQuiz);
// router.delete('/courses/:courseId/quizzes/:quizId', deleteQuiz);

// // Assignment Routes
// router.get('/courses/:courseId/assignments', getAssignments);
// router.get('/courses/:courseId/assignments/:assignmentId', getAssignment);
// router.post('/courses/:courseId/assignments', createAssignment);
// router.put('/courses/:courseId/assignments/:assignmentId', updateAssignment);
// router.delete('/courses/:courseId/assignments/:assignmentId', deleteAssignment);

// // Discussion Routes
// router.get('/courses/:courseId/discussions', getDiscussions);
// router.get('/courses/:courseId/discussions/:discussionId', getDiscussion);
// router.post('/courses/:courseId/discussions', createDiscussion);
// router.put('/courses/:courseId/discussions/:discussionId', updateDiscussion);
// router.delete('/courses/:courseId/discussions/:discussionId', deleteDiscussion);

module.exports = router;
