/* 
    dog date api routing
*/

// middleware
const dateController = require('../controllers/date.controller');
const { createDateValidator } = require('../validators/dogDate.validate')
const { runValidation } = require('../validators/runValidation')

const router = require('express').Router();

router.post('/add', createDateValidator, runValidation, dateController.createDate);
router.post('/accept/:id', dateController.acceptDate);
router.post('/decline/:id', dateController.declineDate);
router.post('/complete/:id', dateController.completeDate);
router.post('/update/:id', dateController.updateDate);
router.get('/:id', dateController.viewAllUsersDates);


module.exports = router;