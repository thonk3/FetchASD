/* 
    dog date api routing
*/

// middleware
const dateController = require('../controllers/date.controller');

const router = require('express').Router();

router.post('/add', dateController.createDate);
router.post('/accept/:id', dateController.acceptDate);
router.post('/decline/:id', dateController.declineDate);
router.post('/update/:id', dateController.updateDate);
router.get('/:id', dateController.viewAllUsersDates);


module.exports = router;