const router = require('express').Router();

// The Controller Middleware
const canineController = require('../controllers/canineController');

// Validation
const { runValidation } = require('../validators/runValidation');
const { addDogValidator } = require('../validators/dogValidator');

// Routes
router.get('/', canineController.getDog);
router.get('/:id', canineController.getDogbyId);
router.post('/add', addDogValidator, runValidation, canineController.createDog);

module.exports = router;
