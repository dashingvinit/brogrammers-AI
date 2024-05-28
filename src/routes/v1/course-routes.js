const express = require('express');
const router = express.Router();

const { CourseController, TopicController } = require('../../controllers');

// Course Routes
router.get('/all', CourseController.getCourses);
router.get('/admin', CourseController.getAdminCourses);
router.get('/:id', CourseController.getCourse);

router.post('/new', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

// Topic Routes
router.get('/topic/:userId/:title', TopicController.getTopic);
// router.get('/courses/:courseId/units/:id', CourseController.getUnit);
// router.post('/courses/:courseId/units', CourseController.createUnit);
// router.put('/courses/:courseId/units/:id', CourseController.updateUnit);
// router.delete('/courses/:courseId/units/:id', CourseController.deleteUnit);

// // AI-Generated Quiz Routes
// router.get('/courses/:courseId/quizzes', getQuizzes);
// router.get('/courses/:courseId/quizzes/:quizId', getQuiz);
// router.post('/courses/:courseId/quizzes', createQuiz);
// router.put('/courses/:courseId/quizzes/:quizId', updateQuiz);
// router.delete('/courses/:courseId/quizzes/:quizId', deleteQuiz);

// // Discussion Routes
// router.get('/courses/:courseId/discussions', getDiscussions);
// router.get('/courses/:courseId/discussions/:discussionId', getDiscussion);
// router.post('/courses/:courseId/discussions', createDiscussion);
// router.put('/courses/:courseId/discussions/:discussionId', updateDiscussion);
// router.delete('/courses/:courseId/discussions/:discussionId', deleteDiscussion);

module.exports = router;
