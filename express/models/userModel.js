const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requireq:true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    suburb: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    isStaffUser: {
        type: Boolean,
        default: false,
        required: true
    },
    dogId: {
        type: Array,
        required: false,
                
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;