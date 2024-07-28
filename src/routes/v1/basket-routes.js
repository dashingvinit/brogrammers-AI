const express = require('express');
const router = express.Router();

const { BasketController } = require('../../controllers');

router.get('/', BasketController.getBaskets);
router.post('/create', BasketController.createBasket);

module.exports = router;
