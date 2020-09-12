const router = require('express').Router();
const userController = require('../controllers/userController');
const { runValidation } = require('../validators/runValidation');
const { createUserValidator } = require('../validators/userValidation');

router.get('/', userController.listUser);
router.post('/create', createUserValidator, runValidation, userController.createUser);
router.get('/:id', userController.userByID);
router.put('/:id', userController.updateUser);

module.exports = router;