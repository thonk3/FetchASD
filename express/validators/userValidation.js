const { check } = require('express-validator');

module.exports.createUserValidator = [
    check('firstName')
        .isString()
        .isLength({ max: 30})
        .withMessage('Name must be below 30 characters'),
    check('lastName')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Name must be below 30 characters'),//,
    check('email')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Must be valid email'),
    check('password')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Password must be below 30 characters'),
    check('phoneNumber')
        .isInt()
        .isLength({ min:10, max: 10 })
        .withMessage('phonenumber must be 10 digits'),
    check('suburb')
        .isString()
        .isLength({ max: 30 })
        .withMessage('Suburb must be below 30 characters'),
    check('postcode')
        .isInt()
        .isLength({ min: 4, max: 4 })
        .withMessage('Postcode must be 4 digits and an integer'),
    check('isStaffUser')
        .isBoolean()
        .withMessage('Boolean String')
]