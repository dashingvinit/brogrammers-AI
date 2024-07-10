// routes/placementStoryRoutes.js
const express = require('express');
const router = express.Router();

const { DSAProgressController } = require('../../controllers');

router.get('/:userId', DSAProgressController.getProgressById);
router.patch('/:userId/:dsId/:problemId', DSAProgressController.updateProgress);

module.exports = router;
