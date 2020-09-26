/* 
    dog controller
*/
const Dog = require('../models/dog.model');
const User = require('../models/user.model');

//  GET - all the dogs in the database
module.exports.getAllDog = (req, res) => {
    Dog.find()
        .then((dogs) => {
            res.status(200).send(dogs);
        })
        .catch(err => res.status(400).json({'error': err}));
}

// GET - a singular dog by referencing there _id
module.exports.getDogbyId = (req, res) => {
    Dog.findById(req.params.id)
        .then((dogs) => {
            res.status(200).send(dogs);
        })
        .catch(err => res.status(400).json({'error': err}));
}

// POST - create a new dog for user
module.exports.createDog = async (req, res) => {
    // Dog Object
    let newDog = new Dog(req.body);
    try {
        // save the dog to the database
        const savedDog = await newDog.save();
        // extract the object id from the recently saved dog 
        const dogId = savedDog._id;
        // find the user by the email
        const user = await User.findOneAndUpdate(
            { _id: req.body.UserId },
            //push the dog id into the dogs array
            { $push: {dogs: dogId} },
            {new: true} 
        );
        // Set response status to 200 OK
        return res.status(200).json({
            'user': user._id,
            'msg': 'New dog added succesfully',
            'dog': savedDog,
        });

    } catch (err) {
        // There was an error set it to 400 response
        return res.status(400).json({'error': err});
    }
}
// POST - to update an existing dog
module.exports.updateDog = async (req, res) => {
    try {
        // find user by id
        const user = await User.findById(req.body.UserId);
        console.log("YES");
        const dogId = req.params.id;
        console.log("User:" + user);
        // iterate of the user's dog
        for (x in user.dogs) {
            console.log(user.dogs[x] + '===' + dogId);
            // If a dog belong to the user matches the requested dogId continue
            if (user.dogs[x] === dogId) {
                // Find the dog in the database via dogId and update it with the new details
                const dog = await Dog.findByIdAndUpdate({_id: dogId}, {...req.body}, {new: true});
                // Return 200 OK
                return res.status(200).json({
                    'msg': 'Dog updated succesfully',
                    'dog': dog,
                });
            }  
        }
    } catch (err) {
        // There was an error set it to 400 response
        return res.status(400).json({'error': err});
    }
}

// module.exports.deleteDog = async (req, res) => {
//     try {
//         // find user by id
//         // for loop over dogid to find one to be removed
//         // findbyIdAndUpdate using pull method you can remove an item from an array
//         // https://docs.mongodb.com/manual/reference/operator/update/pull/
//         // then findByIdAndDelete the dog document
//         const user = await User.findById(req.body.userId);
//         console.log("YES");
//         const dogId = req.params.id;
//         console.log("User:" + user);
//         // iterate of the user's dog
//         for (x in user.dogs) {
//             console.log(user.dogs[x] + '===' + dogId);
//             // If a dog belong to the user matches the requested dogId continue
//             if (user.dogs[x] === dogId) {

//                 // Find the dog in the database via dogId and update it with the new details
//                 const dog = await Dog.findByIdAndUpdate({_id: dogId}, {...req.body}, {new: true});
//                 // Return 200 OK
//                 return res.status(200).json({
//                     'msg': 'Dog updated succesfully',
//                     'dog': dog,
//                 });
//             }  
//         }
//     } catch (err) {
//         // There was an error set it to 400 response
//         return res.status(400).json({'error': err});
//     }
// }
