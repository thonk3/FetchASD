const router = require('express').Router();

let User = require('../models/user.model');
let relationship = require('../controllers/relationship.controller');

router.route('/api/relationship')
    .get((req, res) => {
        relationship.getUser();
    });

module.exports = router;