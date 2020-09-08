const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // userID: {
    //     type: String,
    //     required: true
    // },
    // firstName: {
    //     type: String,
    //     required: true,
    //     min: 3,
    //     max: 50,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    //     min: 3,
    //     max: 100,
    // },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        requireq:true,
        min: 6,
        max: 1024   // hashing size
    },
    // slowly implement each part
    // phoneNumber: {
    //     type: String,
    //     required: true
    // },
    // suburb: {
    //     type: String,
    //     required: true
    // },
    // postcode: {
    //     type: String,
    //     required: true
    // },
    // isStaffUser: {
    //     type: Boolean,
    //     default: false,
    //     required: true
    // },
    // dogId: {
    //     type: Array,
    //     required: false,
                
    // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;