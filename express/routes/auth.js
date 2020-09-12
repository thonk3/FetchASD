const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;