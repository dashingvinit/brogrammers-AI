const express = require('express');
const router = express.Router();

const { BuddyController } = require('../../controllers');

router.get('/:id', BuddyController.getProblem);
router.post('/explain', BuddyController.getExplanation);
router.get('/hint', BuddyController.getHint);

router.get('/visualize', BuddyController.getVisual);
router.get('/feedback', BuddyController.getFeedback);

router.patch('/:id', BuddyController.patchProblem);

module.exports = router;
