const router = require('express').Router();
const canineController = require('../controllers/canineController');

router.get('/', canineController.getDog);
router.get('/:id', canineController.getDogbyId);

module.exports = router;
