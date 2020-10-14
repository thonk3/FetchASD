/* 
    dog rating controller
*/

const User = require('../models/user.model');
const Dog = require('../models/dog.model');
const DateObj = require('../models/dogDate.model');

const { exists, update } = require('../models/user.model');

/* main controllers */

// check if there is a rating yet
// used to setup react flags
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
        const user = await User.findById(req.body.userID);
        if (!user) return res.status(400).json({ error: "user not found, please try again" });

        // check if dog is sender/receiver
        user.dogs.filter(dogID => {
            if(dogID.toString() === date.senderID.toString()) dog_is_sender = true;
        })

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
    const rateBy = await Dog.findById(rateByID);

    if(!rateMe) return res.status(400).json({ error: "Error with dog. Please try again or contact admins" });
    if(!rateBy) return res.status(400).json({ error: "Error with dog. Please try again or contact admins" });

    try { // check if past rating exist and return
        let exist = findRating(rateMe.Rating, date.dateID);
        let response = {
            isNew: false,
            rateMeID: rateMeID,
            rateByID: rateByID,
            rating: {}
        }

        if(!exist) {
            console.log("no rating");
            response.isNew = true;
        } else {
            console.log("ther is an old one")
            response.rating = {
                score: exist.score,
                rating: exist.comment,
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            error: e,
            msg: "Rating Error - trouble with returning stuff"
        })
    }

    // return this object
    // {
    //      isNew: true/false,
    //      rateMeID,
    //      rateByID,
    //      rating: {
    //          score, rating
    //      }
    // }
}


// create a new rating
module.exports.newRating = async (req, res) => {
    let rateMe = await Dog.findById(req.body.rateMeID);

    const newRating = {
        rateBy: req.body.rateByID,
        dateID: req.body.dateID,
        score: req.body.score,
        comment: req.body.review,
        createdAt: new Date(),
        lastEdited: new Date(),
    }

    // add new rating
    rateMe.Rating = [
        ...rateMe.Rating,
        newRating,
    ];
    rateMe.Score = newAvgScore(rateMe.Rating);

    // console.log(rateMe);

    try {
        /* const savedRating =  */await rateMe.save();
        return res.status(200).json({ msg: "successfully added a rating" });
    } catch(e) {
        return res.status(400).json({
            error: e,
            msg: "Error creating new rating",
        })
    }
}

// update a rating
module.exports.updateRating = async (req, res) => {
    let rateMe = await Dog.findById(req.body.rateMeID);
    let rating = findRating(rateMe.Rating, req.body.dateID);

    rating.score = req.body.score;
    rating.comment = req.body.review;
    rating.lastEdited = new Date();

    rateMe.Score = newAvgScore(rateMe.Rating);

    try {
        await rateMe.save();
        return res.status(200).json({ msg: "succesfully update rating" })
    } catch(e) {
        return res.status(400).json({
            error: e,
            msg: 'Update Rating Error',
        })
    }
}

// delete a rating
// used post because there was issue passing request params
module.exports.deleteRating = async (req, res) => {
    let dog = await Dog.findById(req.body.dogID);

    // filter out the old rating
    let newRating = dog.Rating.filter(rating => 
        rating.dateID != req.body.dateID)
    dog.Score = newAvgScore(newRating);
    dog.Rating = newRating;

    try {   // save 
        await dog.save();
        return res.status(200).json({ msg: "succesfully deleted a rating" })
    } catch(e) {
        return res.status(400).json({
            error: e,
            msg: 'Delete Rating Error',
        })
    }
}

// /* helper functions */

// get new average
const newAvgScore = (ratingArray) => {
    if(ratingArray.length === 0) return 0;
    let score = 0;
    ratingArray.forEach(elem => { score+=elem.score })

    return (score/ratingArray.length);
}

// test this
// loop through rating list to find rated date
const findRating = (list, dateID) => {
    for(let i = 0; i < list.length; i++) {
        if(list[i].dateID === dateID) return list[i];
    }

    return null;
}




