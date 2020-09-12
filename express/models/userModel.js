const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
    dogs: {
        type: Array,
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