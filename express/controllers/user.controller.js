/* 
    user controller
*/
const User = require('../models/user.model');
const Dog = require('../models/dog.model');


// GET - all users (should be limited for certain users)
module.exports.listUsers = async (req, res) => {
    try {
        let users = await User.find().select('email password');
        return res.status(200).res.json(users);
    } catch (err) {
        return res.status(400).json('Error' + err);
    }
}

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch(err => res.status(400).json({ 'error': err }));
}

// Method to get a particular user's dogs and display it
// as a series of json dog objects
module.exports.userGetDogs = async (req, res) => {
    try {
        // find if user exist by their _id provided by mongodb
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).json('Error' + err);

        // store the users dog _ids
        const dogsArray = user.dogs;
        // create an empty array to push the dog objects into
        const newDogsArray = [];
        // loop over the user's dogs and grab the dog object from
        // the array and put it in the array
        for (i = 0; i < dogsArray.length; i++) {
            const newDog = await Dog.findById(dogsArray[i]);
            newDogsArray.push(newDog);
        }
        // return dog array in the response with json format
        return res.status(200).json(newDogsArray);
    } catch (err) {
        // if error give error
        return res.status(400).json('Error' + err)
    }
}

// get user by id
module.exports.userByID = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if(!user) return res.status(400).json({'error': 'User doesnt exist' });

        // found user
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({'error': err});
    }

}


 module.exports.updateUser = async (req, res) => {
     try {
         let _id = req.params.id;
         User.findByIdAndUpdate(_id, req.body, { new: true }, function(
             err,
             data
         ) {
             if (err) {
                 return res.status(400).json('Error' + err)
             }
             else {
                 return res.status(200)
             }
         })
     } catch (err) {
         return res.status(400).json('Error' + err)
     }
 }

 module.exports.deleteUser = async (req, res) => {
    try {
         const user = await User.findById(req.params.id);
         //iterate of the user's dog
         for (x in user.dogs) {
            console.log("MATCH");
            console.log(user);
            console.log(dog);
            await User.findOneAndUpdate(
            { _id: req.body.id },
                     //pull the dog id from the dogs array
            { $pull: { dogs: user.dogs[x] } }
            );
            console.log("Id Removed from User");
            await Dog.findByIdAndDelete(user.dogs[x], function (err) {
                if (err){
                    console.log("Error: " + err);
                }
            });
            console.log("Dog Document Deleted");
            return res.status(200).json({
                'msg': 'Dog deleted succesfully'
            });
         }
        let deletedUser = await user.remove();
        return res.status(200).json(deletedUser);
    } catch (err) {
        return res.status(400).json('Error' + err)
    }
 }
