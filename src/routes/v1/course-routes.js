const express = require('express');
const { uploadMiddleware } = require('../../config/multer');
const router = express.Router();

const { CourseController, TopicController, QuizController } = require('../../controllers');

// Course Routes
router.get('/all', CourseController.getCourses);
router.get('/all/:id', CourseController.getCoursesById);
router.get('/admin', CourseController.getAdminCourses);
router.get('/:id', CourseController.getCourse);
router.get('/recent/:id', CourseController.getRecent);
// Langchain Routes
router.post('/chat', CourseController.getAnswer);

router.post('/new', uploadMiddleware, CourseController.createCourse);
router.patch('/:id', CourseController.updateCourse);

router.patch('/obj/:id', CourseController.updateCourseObject);
router.patch('/keynotes/:courseId/:title', CourseController.getKeyNote);

router.delete('/:userId/:id', CourseController.deleteCourse);

// Topic Routes
router.get('/topic/:courseId/:subject/:title', TopicController.getTopic);
router.delete('/topic/:courseId/:title', TopicController.deleteTopic);

// Quize Routes
router.get('/quiz/:courseId/:title', QuizController.getQuiz);
router.post('/quiz/:courseId/:title', QuizController.createQuiz);

// router.get('/courses/:courseId/units/:id', CourseController.getUnit);
// router.put('/courses/:courseId/units/:id', CourseController.updateUnit);

module.exports = router;
