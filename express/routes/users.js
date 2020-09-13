const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers)

router.get('/:id', userController.userByID);

router.get('/:id/dogs', userController.userGetDogs);

module.exports = router;