const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema ({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dogID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Canine'
    },
    status: {
        type: String,
        required: true,
        enum: ["Requested", "Accepted"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;