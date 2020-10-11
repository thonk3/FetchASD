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

module.exports.createLocation = async (req, res) => {
    // Location Object
    let newLocation = new Location(req.body);
    try {
        // Save the location object
        const savedLocation = await newLocation.save();
        // TO DO: probably need some error messages
        // Set response status to 200 OK
        return res.status(200).json({
            'msg': 'New Location added successfully',
            'location': savedLocation
        })
    } catch (err) {
        // There was an error set it to 400 response
        return res.status(400).json({ 'error': err });
    }
}

module.exports.updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const location = await Location.findByIdAndUpdate({ _id: locationId }, { ...req.body }, { new: true })

        if (!location) {
            return res.status(400).json({ 'error': 'Could not find location with that _id' });
        } else {
            // Return 200 OK
            return res.status(200).json({
                'msg': 'New Location updated successfully',
                'location': location
            })
        }
    } catch (err) {
        // There was an error set it to 400 response
        return res.status(400).json({ 'error': err });
    }
}

// TO FIX
module.exports.deleteLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        console.log(locationId)
        await Location.findByIdAndDelete({ _id: locationId }, function(err, docs) {
                console.log("HERE")
                if (err) {
                    console.log("error:" + err)
                } else {
                    // Return 200 OK
                    console.log("Deleted:" + docs)
                    return res.status(200).json({
                        'msg': 'New Location deleted successfully'
                        })
                }
            }
        )
            
     } catch (err) {
            // There was an error set it to 400 response
            return res.status(400).json({ 'error': err });
    }
}



