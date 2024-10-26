const express = require('express');
const router = express.Router();

const { ProductController } = require('../../controllers');

// Product Routes
router.get('/all', ProductController.getProduct);
router.get('/find', ProductController.findProduct);

router.post('/new', ProductController.createProduct);
router.patch('/getSignedUrl', ProductController.getSignedUrl);

router.patch('/claim', ProductController.claimProduct);

module.exports = router;
