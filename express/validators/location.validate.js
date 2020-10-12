const { check } = require('express-validator');

// Performs the validation of Dog data upon creation intended for the database
// if wrong it provides the error with "with Message"
module.exports.createLocationValidator = [
        check('newLocation.Name')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Location name must be less than 30 characters long.'),
    // Age has to be an int and can either be '0' or '12' for example
    // Dogs don't live to 100 :'(S
        check('newLocation.Address')
        .isString()
        .isLength({ max: 100 })
        .withMessage('Location address must be less than 30 characters long.'),
    // Breed must be smaller than 30 chars and only letters 
    // breeds don't have numbers like elon's kid
        check('newLocation.openTime')
        //.isDate()
        .isString()
        .isLength({ min: 1, max: 10 })
        .withMessage('openTime must be less than 10 characters long.'),
    // Australian suburbs. I looked it up and the longest one and it is 
    // exactly 31 chars. it is 'Mamungkukumpurangkuntjunya Hill'.
        check('newLocation.closeTime')
        //.isDate()
        .isString()
        .isLength({ min: 1, max: 10})
        .withMessage('closeTime must be less than 10 characters long'),
    // Australian postcodes are in a 4 digit format and only numbers
    check('newLocation.isLeashRequired')
        .isBoolean()
        .withMessage('isLeashRequired can only be "True" or "False".'),
    // Gender I decided to do regex for this only exactly accepting
    // 'Male' or 'Female'    
    check('newLocation.hasToliet')
        .isBoolean()
        .withMessage('hasToliet can only be "True" or "False".'),
    // Dog's Vaccination Status is boolean
    check('newLocation.hasBubbler')
        .isBoolean()
        .withMessage('hasBubbler can only be "True" or "False".'),
    // Dog's Desexed Status is boolean
    check('newLocation.hasParking')
        .isBoolean()
        .withMessage('hasParking can only be "True" or "False".'),
    // Decided to make bio 250 characters because that is the same length
    // as a Twitter post
    check('newLocation.locationImageUrl')
        .optional()
        .isURL()
        .isLength({ min: 1, max: 500})
        .withMessage('parkImageUrl must be less than 250 characters long.')
]

module.exports.updateLocationValidator = [
    check('Name')
    .isString()
    .isLength({ max: 30 })
    .withMessage('Location name must be less than 30 characters long.'),
// Age has to be an int and can either be '0' or '12' for example
// Dogs don't live to 100 :'(S
    check('Address')
    .isString()
    .isLength({ max: 100 })
    .withMessage('Location address must be less than 30 characters long.'),
// Breed must be smaller than 30 chars and only letters 
// breeds don't have numbers like elon's kid
    check('openTime')
    //.isDate()
    .isString()
    .isLength({ min: 1, max: 10 })
    .withMessage('openTime must be less than 10 characters long.'),
// Australian suburbs. I looked it up and the longest one and it is 
// exactly 31 chars. it is 'Mamungkukumpurangkuntjunya Hill'.
    check('closeTime')
    //.isDate()
    .isString()
    .isLength({ min: 1, max: 10})
    .withMessage('closeTime must be less than 10 characters long'),
// Australian postcodes are in a 4 digit format and only numbers
check('isLeashRequired')
    .isBoolean()
    .withMessage('isLeashRequired can only be "True" or "False".'),
// Gender I decided to do regex for this only exactly accepting
// 'Male' or 'Female'    
check('hasToliet')
    .isBoolean()
    .withMessage('hasToliet can only be "True" or "False".'),
// Dog's Vaccination Status is boolean
check('hasBubbler')
    .isBoolean()
    .withMessage('hasBubbler can only be "True" or "False".'),
// Dog's Desexed Status is boolean
check('hasParking')
    .isBoolean()
    .withMessage('hasParking can only be "True" or "False".'),
// Decided to make bio 250 characters because that is the same length
// as a Twitter post
check('locationImageUrl')
    .optional()
    .isURL()
    .isLength({ min: 1, max: 500})
    .withMessage('parkImageUrl must be less than 250 characters long.')
]