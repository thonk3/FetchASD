const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    dateAndTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [ "Upcoming", "Completed" ]
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;