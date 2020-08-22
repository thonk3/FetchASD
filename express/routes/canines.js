// const router = require('express').Router();
// let Canine = require('../models/canine.model');


// // GET all dogs
// router.route('/').get((req, res) => {
//     Canine.find()
// 	.then(people => res.json(canine))
// 	.catch(err => res.status(400).json('Error:' + err));
// });

// // POST add new dog
// router.route('/add').post((req, res) => {
//     const breed = req.body.breed;

//     const newCanine = new Canine({breed});
    
//     newCanine.save()
// 	.then(() => res.json('Canine added!'))
// 	.catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;

import {getDog} from '../controllers/canine.controller';
const routes = (app) => {
    app.route('/')
    //GET endpoint
    .get(getDog)
}

export default routes;