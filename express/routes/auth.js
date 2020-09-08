const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/signin', authController.signIn);
router.post('/signout', authController.signOut);

module.exports = router;