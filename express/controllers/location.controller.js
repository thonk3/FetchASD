/* 
    dog controller
*/
const Location = require('../models/location.model');

//  GET - all the locations in the database
module.exports.getAllLocations = (req, res) => {
    Location.find()
        .then((locations) => {
            res.status(200).send(locations);
        })
        .catch(err => res.status(400).json({ 'error': err }));
}

// GET - a singular dog by referencing there _id
module.exports.getLocationbyId = (req, res) => {
    Location.findById(req.params.id)
        .then((locations) => {
            res.status(200).send(locations);
        })
        .catch(err => res.status(400).json({ 'error': err }));
}


