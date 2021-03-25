const router = require('express').Router();
const friendController = require('../controllers/friend.controller');

router.get('/', friendController.getFriends);
router.post('/add', friendController.createFriend);
router.post('/accept/:id', friendController.acceptFriendRequest);
router.post('/decline/:id', friendController.declineFriendRequest);

module.exports = router;