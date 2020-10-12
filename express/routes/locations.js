/* 
    dog api routing
*/
const router = require('express').Router();

// The Controller Middleware
const locationController = require('../controllers/location.controller');

// Validators
const { runValidation } = require('../validators/runValidation');
const {createLocationValidator, updateLocationValidator}  = require('../validators/location.validate');

// Validation
// const { runValidation } = require('../validators/runValidation');
// const { addDogValidator, updateDogValidator } = require('../validators/dog.validate');

// Routes
// get all locations route Route
router.get('/', locationController.getAllLocations);
// get a particular location id route
router.get('/:id', locationController.getLocationbyId);
// create new locatoin for user
// router.post('/add', locationController.createLocation);
router.post('/add', createLocationValidator, runValidation, locationController.createLocation);
// update location
router.post('/:id/edit', updateLocationValidator, runValidation, locationController.updateLocation);
// delete location
router.post('/:id/delete', locationController.deleteLocation);


module.exports = router;

