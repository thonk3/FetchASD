const router = require('express').Router();
const dateController = require('../controllers/date.controller');

router.route('/')
    .get(dateController.getDates);

router.route('/add')
    .post(dateController.createDate);

module.exports = router;