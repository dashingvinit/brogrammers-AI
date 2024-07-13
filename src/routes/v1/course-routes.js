const express = require('express');
const router = express.Router();

const { CourseController, TopicController } = require('../../controllers');

// Course Routes
router.get('/all', CourseController.getCourses);
router.get('/all/:id', CourseController.getCoursesById);
router.get('/admin', CourseController.getAdminCourses);
router.get('/:id', CourseController.getCourse);
router.get('/recent/:id', CourseController.getRecent);

router.post('/new', CourseController.createCourse);
router.patch('/:id', CourseController.updateCourse);
router.patch('/obj/:id', CourseController.updateCourseObject);
router.delete('/:userId/:id', CourseController.deleteCourse);

// Topic Routes
router.get('/topic/:courseId/:subject/:title', TopicController.getTopic);
router.delete('/topic/:courseId/:title', TopicController.deleteTopic);

// router.get('/courses/:courseId/units/:id', CourseController.getUnit);
// router.put('/courses/:courseId/units/:id', CourseController.updateUnit);

module.exports = router;
