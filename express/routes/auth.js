/* 
    handle routing for authentication
*/

// controller middleware
const {
    Register,
    Login,
} = require('../controllers/authController');

// validator middleware
const {
    registerValidator,
    loginValidator,
} = require('../validators/authValidator')

const { runValidation } = require('../validators/runValidation');
const router = require('express').Router();


// yer routes
router.post("/register", registerValidator, runValidation, Register);
router.post("/login", loginValidator, runValidation, Login);

/* 
    how validation work:
    validator - adds validation rule
    runValidation - checks the post payload against the validation rules
    
    if pass - Controller is called
       fail - returns withMessage() message in validator
*/

module.exports = router;