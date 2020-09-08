const router = require('express').Router();

const {
    Register
} = require('../controllers/authController');

router.post("/register", Register);

module.exports = router;