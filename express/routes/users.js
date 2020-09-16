const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.listUsers)

router.get('/:id', userController.userByID);

// Route for getting a user's dogs
// it requires a user _id
router.get('/:id/dogs', userController.userGetDogs);

module.exports = router;