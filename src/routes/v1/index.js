const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const courseRoutes = require('./course-routes');
const placementRoutes = require('./placement-routes');
const collectionRoutes = require('./collection-routes');
const commentsRoutes = require('./comment-route');
const blindRoutes = require('./blind-routes');
const paymentRoutes = require('./payment-routes');
const basketRoutes = require('./basket-routes');
const productRoutes = require('./product-routes');

router.use('/user', userRoutes);
router.use('/course', courseRoutes);
router.use('/placement', placementRoutes);
router.use('/collection', collectionRoutes);
router.use('/comments', commentsRoutes);
router.use('/dsa', blindRoutes);
router.use('/payment', paymentRoutes);
router.use('/basket', basketRoutes);

router.use('/retoure', productRoutes);

module.exports = router;
