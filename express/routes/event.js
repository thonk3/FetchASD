const EventController = require('../controllers/event.controller');
const router = require('express').Router();
const { createEventValidator, updateEventValidator } = require('../validators/event.validate')
const { runValidation } = require('../validators/runValidation')

router.get('/', EventController.getEvents);
router.get('/:id', EventController.getEventByID);
router.post('/', createEventValidator, runValidation, EventController.createEvent);
router.put('/:id', updateEventValidator, runValidation, EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

module.exports = router;