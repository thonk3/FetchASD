/*
    users api routing 
*/
const router = require('express').Router();
const userController = require('../controllers/user.controller');

// prob need middleware to verify role token here later
router.get('/', userController.listUsers)

// @MAX maybe try to move the ID into the request body?? its fine eitherway
router.get('/:id', userController.userByID);

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// Route for getting a user's dogs
// it requires a user _id
router.get('/:id/dogs', userController.userGetDogs);

router.delete('/:id', userController.deleteUser);
// Route for getting a user's dogs
// it requires a user _id
router.get('/:id/dogs', userController.userGetDogs);

module.exports = router;