/* 
    dog rating controller
*/

const User = require('../models/user.model');
const Dog = require('../models/dog.model');
const Date = require('../models/dogDate.model');
const e = require('express');
const { json } = require('express');

/* main controllers */

// check if there is a rating yet
// if yes return the rating object
// if no return mesage
module.exports.checkRating = async (req, res) => {
    // req.body has
    // |    userID
    // |    date : 
    // |    |   dateID
    // |    |   senderID
    // |    |   receiverID

    let dog_is_sender = false; // assuming one of the dog belongs to the user, unsafe implementation
    let date = req.body.date;

    // its long but its safer
    try {   // check for missing params
        console.log(req.body.userID)
        const user = await User.findById(req.body.userID);
        if (!user) return res.status(400).json({ error: "user not found, please try again" });

        console.log("user is ok ==============");
        console.log(user);
        console.log(date);
        console.log("=========================");
                                                                              
        // figguring which dog belongs to the user
        // console.log(user.dogs);
        user.dogs.filter(dogID => {
            console.log(dogID, "  ", date.senderID);
            if(dogID.toString() === date.senderID.toString()) dog_is_sender = true;
        })

        console.log();  // testing
        console.log("sender:", dog_is_sender);
        console.log("receiver:", !dog_is_sender);
        console.log();

    } catch (e) {   // missing parameters
        return res.status(400).json({ 
            error: e,
            msg: "request body missing parameters, please try again or contact admins for help"
        })
    }

    // set who is who
    const rateMeID = (dog_is_sender) ? date.senderID : date.receiverID;
    const rateByID = (dog_is_sender) ? date.receiverID : date.senderID;
    const rateMe = await Dog.findById(rateMeID);

    // Check for past ratings
    console.log(rateMe.Rating);

    try {
        let exist = findRating(rateMe.rating, date.dateID);
        let response = {
            isNew: false,
            rateMeID: rateMeID,
            rateByID: rateByID,
            rating: {}
        }
        console.log(date.dateID);
        console.log(exist);
        // if NO rating return { msg: "no rating" }
        if(!exist) {
            console.log("no rating");
            response.isNew = true;
        } else {
            console.log("ther is an old one")
            response.rating = exist;
        }

        // return 
        return res.status(400).json(response);
    } catch (error) {
        return res.status(400).json({
            error: e,
            msg: "Rating Error - trouble with returning stuff"
        })
    }

    // old code block for debugging
    // try {
    //     console.log("Checking existing dates");
    //     return res.status(200).json({
    //         isNew: false,
    //         ratingThis: rateMe,
    //         msg: "hello",
    //         rating: {
    //             date: date.dateID,
    //             rateMe: rateMeID,
    //             rateby: rateByID,
    //         }
    //     });
    // } catch (error) {
    //     return res.status(400).json({ msg: "something went wrong" });
    // }

    // return this object
    // {
    //     isNew: true/false,
    //     // if true return empty rating object
    //     // if false return existing rating object
    //     rating: {
    //         score, rating
    //     }
    // }
}


// // create a new rating
// module.exports.newRating = async (req, res) => {
//     // check if the dogs exists
//     const rateMe = await Dog.findOne({ _id: req.body.dogID });
//     const imRating = await Dog.findOne({ _id: req.body.rateBy });

//     if(!rateMe || !imRating)    // if the dogs are not found
//         return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });
    
//     // check if rating exist by filtering dateID in rateme.Rating
    

//     // probably need to redo all of these down here
//     // new rating object
//     const newRating = {
//         rateBy: imRating._id,
//         score: req.body.score,
//         comment: req.body.comment,
//         createdAt: new Date().dateOn,
//         lastEdited: new Date().dateOn,
//     }


//     // check if the dog rated before
//     let pastRating = rateMe.Rating.filter(rating => 
//         rating.rateBy.toString() === req.body.rateBy);
    
//     if(pastRating.length === 0) {

//         // filtering out mongo's default empty object in array
//         rateMe.Rating = [
//             ...rateMe.Rating.filter(rating => rating.score !== undefined),
//             newRating
//         ];
//         rateMe.Score = newAvgScore(rateMe.Rating);

//         try {   // save to db
//             await rateMe.save();
//             return res.status(200).json({
//                 msg: "successfully added a new rating",
//                 rating: rateMe.Rating
//             })
//         } catch (e) {
//             return res.status(400).json({ error: e });
//         }

//     } else {    // a past rating from this dog exist
//         return res.status(400).json({ error: "There is an existing rating, Please try again or contact the admin" });
//     }
// }

// // update a rating
// module.exports.updateRating = async (req, res) => {
//     const rateMe = await Dog.findOne({ _id: req.body.dogID });
//     const imRating = await Dog.findOne({ _id: req.body.rateBy });

//     if(!rateMe || !imRating)    // if the dogs are not found
//         return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });

//     // update
//     for(let i = 0; i < rateMe.Rating.length; i++){
//         if(rateMe.Rating[i].rateBy.toString() === req.body.rateBy){
//             console.log("foudn it", i);
//             rateMe.Rating[i] = {
//                 ...req.body.newChange,
//                 lastEdited: new Date().dateOn,
//             }
//         }
//     }
//     rateMe.Score = newAvgScore(rateMe.Rating);

//     try {
//         return res.status(200).json({
//             msg: 'succesfuly updated dog rating',
//             rating: rateMe,
//         })
//     } catch (e) {
//         return res.status(400).json({ error: e });
//     }
// }


// // delete a rating
// module.exports.deleteRating = async (req, res) => {
//     const rateMe = await Dog.findOne({ _id: req.body.dogID });
//     const imRating = await Dog.findOne({ _id: req.body.rateBy });

//     if(!rateMe || !imRating)    // if the dogs are not found
//         return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });

//     // update rating array & avg score
//     rateMe.Rating = rateMe.Rating.filter(rating => rating.rateBy.toString() !== req.body.rateBy);
//     rateMe.Score = (rateMe.Rating.length === 0)
//         ? null
//         : newAvgScore(rateMe.Rating)

//     try {
//         await rateMe.save();
//         return res.status(200).json({
//             msg: "successfully removed a rating",
//             rating: rateMe
//         })

//     } catch(e) {
//         return res.status(400)
//             .json({ error: e });
//     }
// }



// /* helper functions */

// get new average
const newAvgScore = (ratingArray) => {
    let score = 0;
    ratingArray.forEach(elem => { score+=elem.score })

    return (score/ratingArray.length);
}

// test this
// loop through rating list to find rated date
const findRating = (list, dateID) => {
    for(r in list) {
        if(r.dateID === dateID) return r;
    }
    return null;
}




