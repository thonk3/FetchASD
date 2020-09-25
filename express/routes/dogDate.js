/* 
    dog date api routing
*/

// middleware
const dateController = require('../controllers/date.controller');

const router = require('express').Router();

router.post('/add', dateController.createDate);
router.post('/accept/:id', dateController.acceptDate);
router.post('/update/:id', dateController.updateDate);

// router.get('/upcoming/:id', dateController.viewUpcomingDates);
// router.get('/sent/:id', dateController.viewSentDateRequests);
// router.get('/received/:id', dateController.viewReceivedDateRequests);
// router.get('/completed/:id', dateController.viewCompletedDates);
router.get('/:id', dateController.viewAllUsersDates);

module.exports = router;