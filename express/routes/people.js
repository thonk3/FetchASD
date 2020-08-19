const router = require('express').Router();
let Person = require('../models/person.model');
let UserSchema = require('../models/user.model');

const User = UserSchema.User;

// GET all people
router.route('/').get((req, res) => {
    Person.find()
	.then(people => res.json(people))
	.catch(err => res.status(400).json('Error:' + err));
});

// POST add new user
router.route('/add').post((req, res) => {
    const name = req.body.username;

    const newUser = new Person({name});
    
    newUser.save()
	.then(() => res.json('User added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/rel').get((req, res) => {
    User.find()
	.then(user => res.json(user))
	.catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;
