const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    senderID: {
        type: String,
        default: ""
    },
    msgTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sentOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    status: {
        type: String, 
        required: true,
        default: "new"     // new ,read, resolved
    }
});

const Msg = mongoose.model('Messages', msgSchema);

module.exports = Msg;