const { check } = require('express-validator');

// Performs the validation of Location data upon creation intended for the database
// if wrong it provides the error with "with Message"
module.exports.createLocationValidator = [
        check('newLocation.Name')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Name must be less than 30 characters long.'),
        check('newLocation.Address')
        .isString()
        .isLength({ max: 100 })
        .withMessage('Address must be less than 100 characters long.'),
    check('newLocation.isLeashRequired')
        .isBoolean()
        .withMessage('isLeashRequired can only be "True" or "False".'),

    check('newLocation.hasToliet')
        .isBoolean()
        .withMessage('hasToliet can only be "True" or "False".'),

    check('newLocation.hasBubbler')
        .isBoolean()
        .withMessage('hasBubbler can only be "True" or "False".'),
    check('newLocation.hasParking')
        .isBoolean()
        .withMessage('hasParking can only be "True" or "False".'),
    check('newLocation.locationImageUrl')
        .optional()
        .isURL()
        .isLength({ min: 1, max: 500})
        .withMessage('Image URK must be less than 500 characters long.')
]

// Performs the validation of Location data upon updating a location object
// if wrong it provides the error with "with Message"
module.exports.updateLocationValidator = [
    check('Name')
    .isString()
    .isLength({ max: 30 })
    .withMessage('Name must be less than 30 characters long.'),
    check('Address')
    .isString()
    .isLength({ max: 100 })
    .withMessage('Address must be less than 100 characters long.'),
check('isLeashRequired')
    .isBoolean()
    .withMessage('isLeashRequired can only be "True" or "False".'), 
check('hasToliet')
    .isBoolean()
    .withMessage('hasToliet can only be "True" or "False".'),
check('hasBubbler')
    .isBoolean()
    .withMessage('hasBubbler can only be "True" or "False".'),
check('hasParking')
    .isBoolean()
    .withMessage('hasParking can only be "True" or "False".'),

check('locationImageUrl')
    .optional()
    .isURL()
    .isLength({ min: 1, max: 500})
    .withMessage('Image URL must be less than 500 characters long.')
]