/* 
    dog api routing
*/
const router = require('express').Router();

// The Controller Middleware
const dogController = require('../controllers/dog.controller');
const { report, all } = require('./auth');

// Validation
const { runValidation } = require('../validators/runValidation');
const { addDogValidator } = require('../validators/dog.validate');

// Routes
// get all dogs route Route
router.get('/', dogController.getAllDog);
// get a particular dogs id route
router.get('/:id', dogController.getDogbyId);
// create new dog for user
router.post('/add', addDogValidator, runValidation, dogController.createDog);

module.exports = router;

