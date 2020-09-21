const router = require('express').Router();
const canineController = require('../controllers/canineController');

// router.get('/:query', canineController.getDogbySuburb);
router.get('/:id', canineController.getDogbyId);
router.get('/', canineController.getDog);



module.exports = router;
