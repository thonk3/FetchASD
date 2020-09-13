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

module.exports = router;