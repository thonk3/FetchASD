const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* 
required: firstName, lastName, email, password, suburb, postcode */
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 6, max: 50,
    },
    password: {         // hashed passwords only
        type: String,
        requireq:true,
        min: 1024, max: 1024 
    },
    phoneNumber: {
        type: String,
        required: false,
        max: 10,
    },
    suburb: {
        type: String,
        required: true,
        max: 30
    },
    postcode: {
        type: String,
        required: true,
        min: 4, max: 4
    },
    isStaffUser: {
        type: Boolean,
        default: false,
        required: true
    },
    dogId: {
        type: [String],
        required: false,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;