/* 
    Dog Dates Controller
*/
const DogDate = require('../models/dogDate.model');

// Creates a new date
exports.createDate = (req, res) => {
    let dogDate = new DogDate(req.body);
    dogDate.save()
        .then(dogDate => {
            return res.status(200).json({dogDate});    
    })
    .catch(err => {
        return res.status(400).json({ 'error': err });    
    });
}

// Updates the date of and the location of an existing date
exports.updateDate = async(req, res) => {
    let updatedDate = await DogDate.findOneAndUpdate({
        _id: req.params.id
    }, {
        dateOn: new Date(req.body.dateOn),
        location: req.body.location,
    }, {new: true})
    if(!updatedDate)
        return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
    else {
        return res.status(200).json({ 
            'message': 'Dog Date has been updated',
            'Updated Date': updatedDate 
        });
    }
}

// Returns JSON containing a list of all the upcoming dates of a dog
exports.viewUpcomingDates = async(req, res) => {
    let receivedDates = await DogDate.find({
        "receiverDogID": req.params.id,
        "status": "Upcoming",
    })

    let sentDates = await DogDate.find({
        "senderDogID": req.params.id,
        "status": "Upcoming",
    })

    let combinedDates = [
        ...receivedDates,
        ...sentDates
    ]

    if (combinedDates.length <= 0) 
        return res.status(400).json({ 'error': 'Could not find any upcoming dog dates'});
    else {
        res.status(200).json({
            'message': 'Upcoming dog dates found successfully',
            'date': combinedDates,
        });
    }
}

// Returns a list of sent date reqeusts to other dogs
exports.viewSentDateRequests = async(req, res) => {
    let query = await DogDate.find({
        "senderDogID": req.params.id,
        "status": "Requested",
    })

    if (query.length <= 0) 
        return res.status(400).json({ 'error': 'Could not find sent date requests'});
    else {
        res.status(200).json(query);
    }
}

// Returns a list of all received date requests
exports.viewReceivedDateRequests = async(req, res) => {
    let query = await DogDate.find({
        "receiverDogID": req.params.id,
        "status": "Requested",
    })

    if (query.length <= 0) 
        return res.status(400).json({ 'error': 'Could not find sent date requests'});
    else {
        res.status(200).json({
            'message': 'Received date requests found successfully',
            'date': query,
        });
    }
}

// Returns a list of all completed dates
exports.viewCompletedDates = async(req, res) => {
    let receivedCompletedDates = await DogDate.find({
        "receiverDogID": req.params.id,
        "status": "Completed",
    })

    let sentCompletedDates = await DogDate.find({
        "senderDogID": req.params.id,
        "status": "Completed",
    })

    let combinedDates = [
        ...receivedCompletedDates,
        ...sentCompletedDates

    ]

    if (combinedDates.length <= 0) 
        return res.status(400).json({ 'error': 'Could not find any upcoming dog dates'});
    else {
        res.status(200).json({
            'message': 'Upcoming dog dates found successfully',
            'date': combinedDates,
        });
    }
}

// Accepts a requested date 
exports.acceptDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {  // not found
            return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
        }
        
        dogDate.status = "Upcoming";
        dogDate.save()
            .then(dogDate => {
                return res.status(200).json({ 'message': 'Dog Date has been accepted' });
            })
            .catch(err => {
                return res.status(400).send({ 'error': 'Could not accept the dog date' });
            });
    });
}

// Declines a requested date and deletes a created date
exports.declineDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {
            return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
        } 

        dogDate.deleteOne()
            .then(dogDate =>{
                return res.status(200).json({ 'message': 'Dog Date request has been declined' });
            }).catch(err => {
                return res.status(400).json({ 'error': 'Could not decline the dog date' });
            });
    });
}

/* 
- the decline date currently only deletes the date
- doesnt notify the inviter
*/
