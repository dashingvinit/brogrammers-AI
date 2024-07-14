const express = require('express');
const router = express.Router();

const { PaymentController } = require('../../controllers');

router.get('/key', PaymentController.getKey);
router.post('/checkout', PaymentController.checkOut);
router.post('/verification', PaymentController.verify);

module.exports = router;
