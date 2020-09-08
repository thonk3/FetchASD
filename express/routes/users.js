const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/api/users', userController.listUser);
router.post('/api/users', userController.createUser);

module.exports = router;