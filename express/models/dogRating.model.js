
/*
    dog rating model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dogRatingSchema = new Schema({
    // dogID: {
    //     type: mongoose.Types.ObjectId,
    //     // required: true,
    // },
    rateBy: {
        type: mongoose.Types.ObjectId,
        // required: true,
    },
    score: {
        type: Number,
        // required: true,
    },
    comment: {
        type: String,
        // required: false,
        // default: ""
    },
    createdAt: {
        type: Date,
        // required: true,
    },
    lastEdited: {   // first entry will be the same as createdAt
        type: Date, // then change when an edit is made
        // required: true,
    }
    // rateBy: String, 
    // score: Number,
    // comment: String,
    // createdAt: Date,
    // lastEdited: Date
});

const DogRating = mongoose.model('dogRating', dogRatingSchema);

module.exports = { DogRating, dogRatingSchema };


