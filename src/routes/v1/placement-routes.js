// routes/placementStoryRoutes.js
const express = require('express');
const router = express.Router();

const { PlacementController } = require('../../controllers');

router.get('/', PlacementController.getAll);
router.get('/latest', PlacementController.getLatest);
router.get('/continue/:id', PlacementController.getContinue);
router.get('/bookmarked/:id', PlacementController.getBookmarked);
router.get('/:id', PlacementController.getStoryById);

router.post('/:userId', PlacementController.createStory);

router.patch('/:id', PlacementController.updateStory);
router.patch('/:userId/:blogId', PlacementController.updateLikes);

router.delete('/:id', PlacementController.deleteStory);

module.exports = router;
