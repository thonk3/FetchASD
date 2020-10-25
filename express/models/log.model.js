const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    email: {
        type: String,
        required: true,
        min: 6, max: 50,
    },
    password: {         // hashed passwords only
        type: String,
        requireq:true,
        min: 90, max: 90
    },
    logIn: {
        type: Boolean,
        required: true
    },
    dateTime: {
        type: Date,
        required: true,
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;