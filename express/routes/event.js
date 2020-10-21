const EventController = require('../controllers/event.controller');
const router = require('express').Router();

router.get('/', EventController.getEvents);
router.get('/:id', EventController.getEventByID);
router.post('/', EventController.createEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

module.exports = router;