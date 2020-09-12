const router = require('express').Router();

// controller middleware
const {
    Register,
    Login,
} = require('../controllers/authController');

// validator middleware
const { runValidation } = require('../validators/runValidation');
const {
    registerValidator,
    loginValidator,
} = require('../validators/authValidator')


// yer routes
router.post("/register", registerValidator, runValidation, Register);
router.post("/login", loginValidator, runValidation, Login);

module.exports = router;