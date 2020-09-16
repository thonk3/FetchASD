const mongoose = require('mongoose');
const { schema } = require('./dog.model');
const Schema = mongoose.Schema;

const dogDateSchema = new Schema ({
    firstDogID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Canine'
    },
    secondDogID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Canine'
    },
    status: {
        type: String,
        required: true,
        enum: ["Requested", "Upcoming", "Completed"]
    },
    dateOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    parkID: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Park'
    },
    location: {
        type: String,
        required: true
    }
});

const DogDate = mongoose.model('DogDate', dogDateSchema);

module.exports = DogDate;