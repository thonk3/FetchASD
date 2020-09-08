const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema ({
    firstDogID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Canine'
    },
    secondDogID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Canine'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;