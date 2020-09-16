/* 
    Dog Date api routing
*/

// middleware
const dateController = require('../controllers/date.controller');

const router = require('express').Router();

// router.route('/')
//     .get(dateController.getDates);

// router.route('/add')
//     .post(dateController.createDate);

// router.route('/accept/:id')
//     .post(dateController.acceptDate);

// router.route('/decline/:id')
//     .post(dateController.declineDate);

// hoi hoi changing to use the other one for post reqest validations

router.get('/', dateController.getDates);

router.post('/add', dateController.createDate);
router.post('/accept/:id')

module.exports = router;