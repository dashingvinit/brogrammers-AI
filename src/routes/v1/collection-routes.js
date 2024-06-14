const express = require('express');
const router = express.Router();

const { CollectionController } = require('../../controllers');

router.get('/:title', CollectionController.getCollectionByTitle);
router.put('/:userId/:title', CollectionController.createCollection);
router.patch('/:id', CollectionController.updateCollection);

module.exports = router;
