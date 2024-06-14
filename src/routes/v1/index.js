const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const courseRoutes = require('./course-routes');
const placementRoutes = require('./placement-routes');
const collectionRoutes = require('./collection-routes');

router.use('/user', userRoutes);
router.use('/course', courseRoutes);
router.use('/placement', placementRoutes);
router.use('/collection', collectionRoutes);

module.exports = router;
