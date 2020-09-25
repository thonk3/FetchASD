const { check } = require('express-validator');

// Performs the validation of Dog data upon creation intended for the database
// if wrong it provides the error with "with Message"
module.exports.addDogValidator = [
    // check('userId')
    //     .isMongoId()
    //     .withMessage('Must be User ID format'),
    // // Name must be smaller than 30 chars
    check('Name')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Dog name must be less than 30 characters long.'),
    // Age has to be an int and can either be '0' or '12' for example
    // Dogs don't live to 100 :'(S
        check('Age')
        .isInt()
        .isLength({ min: 1, max: 2 })
        .withMessage('Age must be an integer and a maximum of 2 digits long.'),
    // Breed must be smaller than 30 chars and only letters 
    // breeds don't have numbers like elon's kid
        check('Breed')
        .isString()
        .isLength({ min: 1, max: 30 })
        .withMessage('Breed must be less than 30 characters long.'),
    // Australian suburbs. I looked it up and the longest one and it is 
    // exactly 31 chars. it is 'Mamungkukumpurangkuntjunya Hill'.
        check('Suburb')
        .isString()
        .isLength({ min: 1, max: 31})
        .withMessage('Suburb must be less than 30 characters long.'),
    // Australian postcodes are in a 4 digit format and only numbers
    check('Postcode')
        .isString()
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .withMessage("Postcode must be an integer and have a length of 4."),
    // Gender I decided to do regex for this only exactly accepting
    // 'Male' or 'Female'    
    check('Gender')
        .isString()
        .matches('^(Male)?$|^(Female)?$')
        .isLength({ min: 4, max: 6 })
        .withMessage('Dog Gender can only be "Male" or "Female".'),
    // Dog's Vaccination Status is boolean
    check('isVaccinated')
        .isBoolean()
        .withMessage('Vaccination status can only be "True" or "False".'),
    // Dog's Desexed Status is boolean
        check('isDesexed')
        .isBoolean()
        .withMessage('Desexed status can only be "True" or "False".'),
    // Decided to make bio 250 characters because that is the same length
    // as a Twitter post
    check('Bio')
        .isString()
        .isLength({ min: 1, max: 250})
        .withMessage('Bio must be less than 250 characters long.')
]

// Performs the validation of Dog data upon updating intended for the database
// if wrong it provides the error with "with Message"
module.exports.updateDogValidator = [
    // Must be in MongoDBId format
    // check('userId')
    //     .isMongoId()
    //     .withMessage('Must be a valid User Id'),
    // Must be in MongoDBId format    
    // check('userId')
    //     .isMongoId()
    //     .withMessage('Must be a valid Dog Id'),
    // Name must be smaller than 30 chars
    check('Name')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Dog name must be less than 30 characters long.'),
    // Age has to be an int and can either be '0' or '12' for example
    // Dogs don't live to 100 :'(S
        check('Age')
        .isInt()
        .isLength({ min: 1, max: 2 })
        .withMessage('Age must be an integer and a maximum of 2 digits long.'),
    // Breed must be smaller than 30 chars and only letters 
    // breeds don't have numbers like elon's kid
        check('Breed')
        .isString()
        .isLength({ min: 1, max: 30 })
        .withMessage('Breed must be less than 30 characters long.'),
    // Australian suburbs. I looked it up and the longest one and it is 
    // exactly 31 chars. it is 'Mamungkukumpurangkuntjunya Hill'.
        check('Suburb')
        .isLength({ min: 1, max: 31})
        .withMessage('Suburb must be less than 30 characters long.'),
    // Australian postcodes are in a 4 digit format and only numbers
    check('Postcode')
        .isString()
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .withMessage("Postcode must be an integer and have a length of 4."),
    // Gender I decided to do regex for this only exactly accepting
    // 'Male' or 'Female'    
    check('Gender')
        .isString()
        .matches('^(Male)?$|^(Female)?$')
        .isLength({ min: 4, max: 6 })
        .withMessage('Dog Gender can only be "Male" or "Female".'),
    // Dog's Vaccination Status is boolean
    check('isVaccinated')
        .isBoolean()
        .withMessage('Vaccination status can only be "True" or "False".'),
    // Dog's Desexed Status is boolean
        check('isDesexed')
        .isBoolean()
        .withMessage('Desexed status can only be "True" or "False".'),
    // Decided to make bio 250 characters because that is the same length
    // as a Twitter post
    check('Bio')
        .isString()
        .isLength({ min: 1, max: 250})
        .withMessage('Bio must be less than 250 characters long.')
]