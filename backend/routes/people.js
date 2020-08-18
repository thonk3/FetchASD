const router = require('express').Router();
let Person = require('../models/person.model');

router.route('/').get((req, res) => {
    Person.find()
	.then(people => res.json(people))
	.catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.username;

    const newUser = new Person({name});
    
    newUser.save()
	.then(() => res.json('User added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
