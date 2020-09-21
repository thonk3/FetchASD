const router = require('express').Router();
const dateController = require('../controllers/date.controller');
const { Router } = require('express');

router.route('/')
    .get(dateController.getDates);

router.route('/add')
    .post(dateController.createDate);

router.route('/accept/:id')
    .post(dateController.acceptDate);

router.route('/decline/:id')
    .post(dateController.declineDate);

module.exports = router;