const router = require('express').Router();
let Canine = require('../models/canine.model');

router.route('/').get((req, res) => {
    Canine.find()
	.then(people => res.json(canine))
	.catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
    const breed = req.body.breed;

    const newCanine = new Canine({breed});
    
    newCanine.save()
	.then(() => res.json('Canine added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
