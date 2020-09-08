const router = require('express').Router();

const {
    Register
} = require('../controllers/authController');

router.post("/", Register);

module.exports = router;