const Event = require('../models/event.model');

module.exports.createEvent = (req, res) => {
    let newEvent = new Event(req.body);
    newEvent.save()
        .then(event => {
            return res.status(200).json({
                message: 'Succesfully created events',
                events: event
            })
        })
        .catch(error => {
            return res.status(404).json({
                error: 'Could not create a new event'
            })
        })
}

module.exports.updateEvent = async (req, res) => {
    const updatedEvent = await Event.findOneAndUpdate({
        _id: req.params.id
    }, {
        ...req.body
    }, { new: true })
    if (!updatedEvent)
        return res.status(404).json({
            error: 'Could not find an event with that ID'
        })
    else {
        return res.status(200).json({
            message: 'Successfully updated event',
            events: updatedEvent 
        });
    }
}

module.exports.completeEvent = async(req, res) => {
    const eventToComplete = await Event.findOneAndUpdate({
        _id: req.body.eventID
    }, {
        status: "Completed",
        ...req.body
    }, { new: true })
    if (!eventToComplete)
        return res.status(404).json({
            error: 'Could not find an event with that ID'
        })
    else {
        return res.status(200).json({
            message: 'Successfully completed event',
        });
    }
}

module.exports.getEvents = async(req, res) => {
    await Event.find()
        .then(event => {
            res.status(200).json({
                upcoming: (event.filter(event => event.status === "Upcoming")),
                completed: (event.filter(event => event.status === "Completed"))
            })
        })
        .catch(error => {
            res.status(400).json({
                error: 'Could not get list of events'
            })
        })
}

module.exports.getEventByID = async(req, res) => {
    await Event.findById(req.params.id)
        .then(event => {
            res.status(200).json({
                events: event
            })
        })
        .catch(error => {
            res.status(404).json({
                error: 'Could not find event with that ID'
            })
        })
}

module.exports.deleteEvent = async(req, res) => {
    await Event.findByIdAndRemove(req.params.id)
        .then(event => {
            res.status(200).json({
                message: 'Event successfully deleted'
            })
        })
        .catch(error => {
            res.status(400).json({
                error: "Event could not be deleted"
            })
        })
}

