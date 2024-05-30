const express = require('express');
const router = express.Router();

const { CourseController, TopicController } = require('../../controllers');

// Course Routes
router.get('/all', CourseController.getCourses);
router.get('/all/:id', CourseController.getCourses);
router.get('/admin', CourseController.getAdminCourses);
router.get('/:id', CourseController.getCourse);
router.get('/recent/:id', CourseController.getRecent);

router.post('/new', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

// Topic Routes
router.get('/topic/:courseId/:title', TopicController.getTopic);
// router.get('/courses/:courseId/units/:id', CourseController.getUnit);
// router.post('/courses/:courseId/units', CourseController.createUnit);
// router.put('/courses/:courseId/units/:id', CourseController.updateUnit);
// router.delete('/courses/:courseId/units/:id', CourseController.deleteUnit);

module.exports = router;
