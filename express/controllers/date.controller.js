/* 
    Dog Dates Controller
*/
const DogDate = require('../models/dogDate.model');
const User = require('../models/user.model');
const Dog = require('../models/dog.model');
const { merge, use } = require('../routes/dogDate');

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
        dateOn: req.body.dateOn,
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

exports.viewAllUsersDates = async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user)  return res.status(400).json({ error: "could not find user" });
        
    let allDogs = await Dog.find();
    let receivedDates = await DogDate.find({ receiverDogID: { $in: user.dogs } });
    let sentDates = await DogDate.find({ senderDates: { $in: user.dogs } });

    // return dogs with name objects
    const getName = (id, list) => {
        let rtn = {}
        for(let i = 0; i < list.length; i++) {
            if(list[i]._id.toString() === id.toString()) {
                rtn = { _id: list[i]._id, name: list[i].Name };
            }
        }

        return rtn;
    }

    // return the date list
    const datePayload = list => 
        list.map(date => {
            return { 
                _id: date._id,
                receiverDog: getName(date.receiverDogID, allDogs),
                senderDog: getName(date.senderDogID, allDogs),
                status: date.status,
                dateOn: date.dateOn,
                location: date.location,
            };
        })
        
    let receivedNames = datePayload(receivedDates);
    let senderNames = datePayload(sentDates);

    let mergedArray = [...receivedNames, ...senderNames];

    const requested = mergedArray.filter(date => date.status=== 'Requested');
    const upcoming = mergedArray.filter(date => date.status=== 'Upcoming');
    const completed = mergedArray.filter(date => date.status=== 'Completed');

    try {
        return res.status(200).json(
            {
                'Message': 'Successful',
                'requested': requested,
                'upcoming': upcoming,
                'completed': completed,
            });
    } catch(e) { return res.status(400).json({ bad: "bad" }) }

}    

// Accepts a requested date 
exports.acceptDate = async (req, res) => {
    const updateDate = await DogDate.findOneAndUpdate({
        _id: req.params.id
    }, {
        status: 'Upcoming',
        ...req.body
    }, { new: true })
    if (!updateDate)
        return res.status(404).json({
            error: 'Could not find date with that ID'
        })
    else {
        return res.status(200).json({
            message: 'Successfully accepted date',
            events: updateDate 
        });
    }
}

exports.completeDate = async (req, res) => {
    const updateDate = await DogDate.findOneAndUpdate({
        _id: req.params.id
    }, {
        status: 'Completed',
        ...req.body
    }, { new: true })
    if (!updateDate)
        return res.status(404).json({
            error: 'Could not find date with that ID'
        })
    else {
        return res.status(200).json({
            message: 'Successfully completed date',
            events: updateDate 
        });
    }
}

// Declines a requested date and deletes a created date
exports.declineDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {
            return res.status(400).json({ 
                'error': 'Could not find dog date with that ID',
            });
        } 
        dogDate.deleteOne()
            .then(dogDate =>{
                return res.status(200).json({ 
                    'message': 'Dog Date request has been declined',
                });
            }).catch(err => {
                return res.status(400).json({ 'error': 'Could not decline the dog date' });
            });
    });
}

