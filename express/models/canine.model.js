const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const canineSchema = new Schema({
    dogName: {
        type: String,
        required: true
    },
    dogAge: {
        type: Number,
        required: true
    },
    dogBreed: {
        type: String,
        required: true
    },
    dogLocation: {
        type: String,
        required: true
    },
    dogGender: {
        type: String,
        enum: ["M","F"]
    },
    dogWeight: {
        type: Number,
        required: true
    },
    isDogVaccinated: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Canine = mongoose.model('Canine', canineSchema);

module.exports = Canine;