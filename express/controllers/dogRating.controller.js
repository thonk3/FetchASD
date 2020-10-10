/* 
    dog rating controller
*/

const User = require('../models/user.model');
const Dog = require('../models/dog.model');
const DateObj = require('../models/dogDate.model');

const { exists, update } = require('../models/user.model');

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
        // console.log(req.body.userID)
        const user = await User.findById(req.body.userID);
        if (!user) return res.status(400).json({ error: "user not found, please try again" });

        // console.log("user is ok ==============");
        // console.log(user);
        // console.log(date);
        // console.log("=========================");
                                                                              
        // figguring which dog belongs to the user
        // console.log(user.dogs);
        user.dogs.filter(dogID => {
            // console.log(dogID, "  ", date.senderID);
            if(dogID.toString() === date.senderID.toString()) dog_is_sender = true;
        })

        // console.log();  // testing
        // console.log("sender:", dog_is_sender);
        // console.log("receiver:", !dog_is_sender);
        // console.log();

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
        console.log("check rating");
        console.log(rateMe.Rating);
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

        console.log(response)
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
        const savedRating = await rateMe.save();
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
module.exports.deleteRating = async (req, res) => {
    let dog = await Dog.findById(req.body.dogID);

    let newRating = dog.Rating.filter(rating => 
        rating.dateID != req.body.dateID)
    dog.Score = newAvgScore(newRating);
    dog.Rating = newRating;

    try {
        await dog.save();
        return res.status(200).json({ msg: "succesfully deleted a rating" })
    } catch(e) {
        return res.status(400).json({
            error: e,
            msg: 'Delete Rating Error',
        })
    }

    return res.status(200).json({ msg: "OK" });
    // const rateMe = await Dog.findOne({ _id: req.body.dogID });
    // const imRating = await Dog.findOne({ _id: req.body.rateBy });

    // if(!rateMe || !imRating)    // if the dogs are not found
    //     return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });

    // // update rating array & avg score
    // rateMe.Rating = rateMe.Rating.filter(rating => rating.rateBy.toString() !== req.body.rateBy);
    // rateMe.Score = (rateMe.Rating.length === 0)
    //     ? null
    //     : newAvgScore(rateMe.Rating)

    // try {
    //     await rateMe.save();
    //     return res.status(200).json({
    //         msg: "successfully removed a rating",
    //         rating: rateMe
    //     })

    // } catch(e) {
    //     return res.status(400)
    //         .json({ error: e });
    // }
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
    console.log("yuck")
    console.log(dateID);
    console.log(list);

    for(let i = 0; i < list.length; i++) {
        if(list[i].dateID === dateID) return list[i];
    }

    return null;
}




