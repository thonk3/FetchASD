const { check } = require('express-validator');

//Note including rating in validation for add dog because all new dogs should get a rating of 0
module.exports.addDogValidator = [
    check('Name')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Dog name must be less than 30 characters long.'),
    check('Age')
        .isInt()
        .isLength({ min: 1, max: 2 })
        .withMessage('Age must be an integer and a maximum of 2 digits long.'),
    check('Breed')
        .isString()
        .isAlpha()
        .isLength({ min: 1, max: 30 })
        .withMessage('Breed must be less than 30 characters long.'),
    check('Suburb')
        .isString()
        .isAlpha()
        .isLength({ min: 1, max: 30})
        .withMessage('Suburb must be less than 30 characters long.'),
    check('Postcode')
        .isString()
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .withMessage("Postcode must be an integer and have a length of 4."),
    check('Gender')
        .isString()
        .matches('^(Male)?$|^(Female)?$')
        .isLength({ min: 4, max: 6 })
        .withMessage('Dog Gender can only be "Male" or "Female".'),
    check('isVaccinated')
        .isBoolean()
        .withMessage('Vaccination status can only be "True" or "False".'),
    check('isDesexed')
        .isBoolean()
        .withMessage('Desexed status can only be "True" or "False".'),
    check('Bio')
        .isString()
        .isLength({ min: 1, max: 250})
        .withMessage('Bio must be less than 250 characters long.')
]