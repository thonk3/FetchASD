const router = require('express').Router();
const friendController = require('../controllers/friend.controller');

router.route('/')
    .get(friendController.getFriends);

module.exports = router;