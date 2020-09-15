const router = require('express').Router();

// The Controller Middleware
const canineController = require('../controllers/dogController');
const { report, all } = require('./auth');

// Validation
const { runValidation } = require('../validators/runValidation');
const { addDogValidator } = require('../validators/dogValidator');

// Routes
// get all dogs route Route
router.get('/', canineController.getDog);
// get a particular dogs id route
router.get('/:id', canineController.getDogbyId);
// creation of new dog that is passed through express-validatior first
router.post('/add', addDogValidator, runValidation, canineController.createDog);

module.exports = router;

