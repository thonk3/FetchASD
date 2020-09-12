const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const canineSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Breed: {
        type: String,
        required: true
    },
    Suburb: {
        type: String,
        required: true
    },
    Postcode: {     
        type: String,
        required: true
    },
    Gender: {
        type: String,
        enum: ["Male","Female"],
        required: true
    },
    isVaccinated: {
        type: Boolean,
        default: false,
        required: true
    },
    isDesexed: {
        type: Boolean,
        default: false,
        required: true
    },
    Bio: {
        type: String,
        required: true,
    },
    // With rating do we need it requried as a dog starts of with a null rating
    Rating: {
        type: Number,
        required: true,
        default: 0
    }
});

const Canine = mongoose.model('Canine', canineSchema);

module.exports = Canine;