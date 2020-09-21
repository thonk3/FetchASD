const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const personSchema = new Schema({
//     name: {
// 	type: String,
// 	required: true,
// 	unique: true,
// 	trim: true,
// 	minlength: 3
//     },
// }, {
//     timestamps: true,
// });

// can i do this
const Person = mongoose.model('Person', new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3
		},
	}, { timestamps: true }
));

module.exports = Person;
