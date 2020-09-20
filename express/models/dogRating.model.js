
/*
    dog rating model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dogRatingSchema = new Schema({
    dogID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    rateBy: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    lastEdited: {   // first entry will be the same as createdAt
        type: Date, // then change when an edit is made
        default: Date.now,
        required: true,
    }
});

const dogRating = mongoose.model('dogRating', dogRatingSchema);

module.exports = { dogRating, dogRatingSchema };


