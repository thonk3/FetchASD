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
        status: "Requested",
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

// It works dude
// exports.viewAllUsersDates = async(req, res) => {
//     const user = await User.findById(req.params.id);
//     if(!user) 
//         return res.status(400).json({
//             'Error': "Could not find dogs"
//         });
//     else {
//         let userDogs = user.dogs;
//         let userDogDates = []
//         for (let i = 0; i < userDogs.length; ++i) {
//             let receivedDates = await DogDate.find({
//                 "receiverDogID": userDogs[i]
//             })
//             let sentDates = await DogDate.find({
//                 "senderDogID": userDogs[i]
//             })
//             if ((await receivedDates).length != 0)
//                 userDogDates.push(receivedDates)
//             if ((await sentDates).length != 0)
//                 userDogDates.push(sentDates)
//         }
//         let mergedArray = [].concat.apply([],userDogDates);
//         const requested = mergedArray.filter(dogDate => {
//             return dogDate.status === 'Requested';
//         })
//         let requestedArray = [];
//         for (let i = 0; i < userDogs.length; ++i) {
//             for (let j = 0; j < requested.length; ++j) {
//                 if (requested[j].receiverDogID.toString() === userDogs[i].toString())
//                     requestedArray.push(requested[j])
//             }
//         }
//         const upcoming = mergedArray.filter(dogDate => {
//             return dogDate.status === 'Upcoming';
//         })
//         const completed = mergedArray.filter(dogDate => {
//             return dogDate.status === 'Completed';
//         })
//         return res.status(200).json({
//             'Message': 'Successful',
//             'requested': requestedArray,
//             'upcoming': upcoming,
//             'completed': completed,
//         })
//     }
// }    

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
exports.acceptDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {  // not found
            return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
        }
        dogDate.status = "Upcoming";
        dogDate.save()
            .then(dogDate => {
                return res.status(200).json({ 
                    'message': 'Dog Date has been accepted',
                });
            })
            .catch(err => {
                return res.status(400).send({ 
                    'error': 'Could not accept the dog date',
                    'err': err 
                });
            });
    });
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
