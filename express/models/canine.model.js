const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const canineSchema = new Schema({
    breed: {
	type: String,
	required: true,
	trim: true,
	minlength: 3
    },
}, {
    timestamps: true,
});

const Canine = mongoose.model('Canine', canineSchema);

module.exports = Canine;
