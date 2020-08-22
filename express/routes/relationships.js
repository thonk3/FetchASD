const router = require('express').Router();
const relationshipController = require('../controllers/relationship.controller');

router.route('/')
    .get(relationshipController.getUsers);

module.exports = router;
