/*
    validation rules for authentication Controller
*/
const { check } = require('express-validator');

module.exports.registerValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long'),
]

module.exports.loginValidator = [
    check('emai')
        .isEmail()
        .withMessage('Must be a valid email address'),
]