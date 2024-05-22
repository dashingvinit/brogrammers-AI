const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const courseRoutes = require('./course-routes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/course', courseRoutes);

module.exports = router;
