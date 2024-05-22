const { Router } = require('express');
const { BLogController } = require('../../controllers/');

const router = Router();

router.get('/:id');
router.post('/:id');
router.delete('/:id');
router.patch(':id');

module.exports = router;
