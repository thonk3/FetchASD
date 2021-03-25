/* 
    router file to handle api routes for communication
*/

// /api/msg

// middle ware
const router = require('express').Router();
const msgController = require('../controllers/messages.controller')

// validation
//const { runValidation } = require('../validators/runValidation');
// validation rule here

// routes

// create
router.post('/new', msgController.new);

// update
router.post('/update', msgController.updateStatus);

// read
router.get('/', msgController.read);
router.get('/one', msgController.readOne);
router.post('/user', msgController.readUser);

// delete by id
router.post('/delete', msgController.delete);


module.exports = router;