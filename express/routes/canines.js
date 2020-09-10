const router = require('express').Router();
const canineController = require('../controllers/canineController');

router.get('/', canineController.getDog);
router.get('/:id', canineController.getDogbyId);
router.post('/add', canineController.createDog);

module.exports = router;
