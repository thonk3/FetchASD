/*
    validation rules for authentication Controller

    no SANITAION yet
*/
const { check } = require('express-validator');

// validation for register/ create new user
// get started with required fields 
module.exports.registerValidator = [
    check('firstName')
        .not().isEmpty()
        .isLength({ max: 50 })
        .withMessage('FirstName must not be empty or over 50 characters'),
    check('lastName')
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('LastName must not be empty or over 50 characters'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })   // raw unhash/salted password
        .withMessage('Password must be atleast 6 characters long'),
    check('phoneNumber')
        .optional()
        .isNumeric({ no_symbols: true })
        .withMessage('Must be a valid phone Number'),
    check('suburb')
        .notEmpty()
        .isLength({ max: 30 })
        .withMessage('Suburb must not be empty or over 50 characters'),
    check('postcode')
        .isNumeric({ no_symbols: true })
        .isLength({ min:4, max: 4 })
        .withMessage('Must be a valid Postcode')

    // staffUser should not be in the payload, set in the controller
    // since this route will be public,
    // it would allow account creation as staff
]

// these are managed in the front end already
// BUT something onion defence model?
module.exports.loginValidator = [
    check('emai')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .notEmpty()
        .withMessage('Must be a valid password')
]