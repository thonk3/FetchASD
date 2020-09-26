const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// optional: phoneNumber, staff, dogid
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
        min: 60, max: 60
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
    // dogs has the type of an array of string values
    // In the MongoDB dogs has to be set to array
    dogs: {
        type: [String],
        required: false, 
    }
});
/*
userSchema
  .set(function(password) {
    this.password = password
})

userSchema.methods = {
    authenticate: function(plainText) {
        return plainText === this.password
    }
}
*/
const User = mongoose.model('User', userSchema);
module.exports = User;