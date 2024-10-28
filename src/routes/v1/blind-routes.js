const express = require('express');
const router = express.Router();

const { BlindController } = require('../../controllers');

router.get('/blind/:id', BlindController.get);
router.patch('/blind/:id/:qs', BlindController.patch);

module.exports = router;
