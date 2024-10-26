const express = require('express');
const router = express.Router();

const { BlindController } = require('../../controllers');

router.get('/:id', BlindController.get);
router.patch('/:id/:qs', BlindController.patch);

module.exports = router;
