/* 
    dog api routing
*/
const router = require('express').Router();

// The Controller Middleware
const locationController = require('../controllers/location.controller');

// Validation
// const { runValidation } = require('../validators/runValidation');
// const { addDogValidator, updateDogValidator } = require('../validators/dog.validate');

// Routes
// get all locations route Route
router.get('/', locationController.getAllLocations);
// get a particular location id route
router.get('/:id', locationController.getLocationbyId);

module.exports = router;

