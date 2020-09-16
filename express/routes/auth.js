/* 
    Auth api routing
*/

// middleware
const authController = require('../controllers/auth.controller');
const validateAuth = require('../validators/auth.validate')
const { runValidation } = require('../validators/runValidation');

const router = require('express').Router();

// ROUTES
router.post("/register", validateAuth.loginValidator, runValidation, authController.register);
router.post("/login", validateAuth.registerValidator, runValidation, authController.login);

/* 
    how validation work:
    validator - adds validation rule
    runValidation - checks the post payload against the validation rules
    
    if  pass - Controller is called
        fail - returns withMessage() message in validator
*/

module.exports = router;