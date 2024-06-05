const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const courseRoutes = require('./course-routes');
const placementRoutes = require('./placement-routes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/course', courseRoutes);
router.use('/placement', placementRoutes);

module.exports = router;
