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
    if(!user) 
        return res.status(400).json({
            'Error': "Could not find dogs"
        });
    else {
        let userDogs = user.dogs;
        let userDogDates = []
        for (let i = 0; i < userDogs.length; ++i) {
            //Find date where dog is the receiver of a date request
            let receivedDate = await DogDate.find({"receiverDogID": userDogs[i] })
            if ((await receivedDate).length != 0) {
                for (let j = 0; j < receivedDate.length; ++j) {
                    let receivedDateDog = await Dog.findById(receivedDate[j].receiverDogID)
                    //Find the sender dog data
                    let senderDateDog = await Dog.findById(receivedDate[j].senderDogID)
                    let dogWithName = [{
                        _id: receivedDate[j]._id,
                        receiverDog: {
                            receiverDogID: receivedDate[j].receiverDogID,
                            name: receivedDateDog.Name
                        },
                        senderDog: {
                            senderDogID: receivedDate[j].senderDogID,
                            name: senderDateDog.Name
                        },
                        status: receivedDate[j].status,
                        dateOn: receivedDate[j].dateOn,
                        location: receivedDate[j].location
                    }]
                    userDogDates.push(dogWithName);
                }
            }

            let sentDate = await DogDate.find({ "senderDogID": userDogs[i] })
            if ((await sentDate).length != 0) {
                for (let k = 0; k < sentDate.length; ++k) {
                    //Find the received dog data
                    let recDateDog = await Dog.findById(sentDate[k].receiverDogID)
                    //Find the sender dog data
                    let senDateDog = await Dog.findById(sentDate[k].senderDogID)
                    let dateDogWithName = [{
                        _id: sentDate[k]._id,
                        receiverDog: {
                            receiverDogID: sentDate[k].receiverDogID,
                            name: recDateDog.name
                        },
                        senderDog: {
                            senderDogID: sentDate[k].senderDogID,
                            name: senDateDog.name
                        },
                        status: sentDate[k].status,
                        dateOn: sentDate[k].dateOn,
                        location: sentDate[k].location
                    }]
                    userDogDates.push(dateDogWithName);
                }
            }
            
        }
        let mergedArray = [].concat.apply([],userDogDates);

            const requested = mergedArray.filter(dogDate => {
                return dogDate.status === 'Requested';
            })
            let requestedArray = [];

            for (let i = 0; i < userDogs.length; ++i) {
                for (let j = 0; j < requested.length; ++j) {
                    if (requested[j].receiverDog.receiverDogID.toString() === userDogs[i].toString())
                        requestedArray.push(requested[j])
                }
            }

            const upcoming = mergedArray.filter(dogDate => {
                return dogDate.status === 'Upcoming';
            })

            const completed = mergedArray.filter(dogDate => {
                return dogDate.status === 'Completed';
            })

            return res.status(200).json({
                'Message': 'Successful',
                'requested': requestedArray,
                'upcoming': upcoming,
                'completed': completed,
            })
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

/* 
- the decline date currently only deletes the date
- doesnt notify the inviter
*/
