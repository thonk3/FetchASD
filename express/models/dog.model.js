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
        enum: ["Male","Female"]
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
    // Start rating as null as Bao said plus all new dogs don't have
    // a rating yet
    Rating: {
        type: Number,
        required: false,
        default: null
    }
});

const Canine = mongoose.model('Canine', canineSchema);

module.exports = Canine;