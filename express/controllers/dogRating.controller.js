/* 
    dog rating controller
*/

const Dog = require('../models/dog.model');
const Date = require('../models/dogDate.model');

/* main controllers */
module.exports.newRating = async (req, res) => {
    // get existing dog object
    const rateMe = await Dog.findOne({ _id: req.body.dogID });
    const imRating = await Dog.findOne({ _id: req.body.rateBy });

    if(!rateMe || !imRating)    // if the dogs are not found
        return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });

    // new rating object
    const newRating = {
        rateBy: imRating._id,
        score: req.body.score,
        comment: req.body.comment,
        createdAt: new Date().dateOn,
        lastEdited: new Date().dateOn,
    }

    // check if the dog rated before
    let pastRating = rateMe.Rating.filter(rating => 
        rating.rateBy.toString() === req.body.rateBy);
    
    if(pastRating.length === 0) {

        // filtering out mongo's default empty object in array
        rateMe.Rating = [
            ...rateMe.Rating.filter(rating => rating.score !== undefined),
            newRating
        ];
        rateMe.Score = newAvgScore(rateMe.Rating);

        try {   // save to db
            await rateMe.save();
            return res.status(200).json({
                msg: "successfully added a new rating",
                rating: rateMe.Rating
            })
        } catch (e) {
            return res.status(400).json({ error: e });
        }

    } else {    // a past rating from this dog exist
        return res.status(400).json({ error: "There is an existing rating, Please try again or contact the admin" });
    }
}

//
module.exports.updateRating = async (req, res) => {
    const rateMe = await Dog.findOne({ _id: req.body.dogID });
    const imRating = await Dog.findOne({ _id: req.body.rateBy });

    if(!rateMe || !imRating)    // if the dogs are not found
        return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });

    // update
    for(let i = 0; i < rateMe.Rating.length; i++){
        if(rateMe.Rating[i].rateBy.toString() === req.body.rateBy){
            console.log("foudn it", i);
            rateMe.Rating[i] = {
                ...req.body.newChange,
                lastEdited: new Date().dateOn,
            }
        }
    }
    rateMe.Score = newAvgScore(rateMe.Rating);

    try {
        return res.status(200).json({
            msg: 'succesfuly updated dog rating',
            rating: rateMe,
        })
    } catch (e) {
        return res.status(400).json({ error: e });
    }
}



module.exports.deleteRating = async (req, res) => {
    const rateMe = await Dog.findOne({ _id: req.body.dogID });
    const imRating = await Dog.findOne({ _id: req.body.rateBy });

    if(!rateMe || !imRating)    // if the dogs are not found
        return res.status(400).json({ error: "Dogs not found, Please try again or contact the admin" });

    // update rating array & avg score
    rateMe.Rating = rateMe.Rating.filter(rating => rating.rateBy.toString() !== req.body.rateBy);
    rateMe.Score = (rateMe.Rating.length === 0)
        ? null
        : newAvgScore(rateMe.Rating)

    try {
        await rateMe.save();
        return res.status(200).json({
            msg: "successfully removed a rating",
            rating: rateMe
        })

    } catch(e) {
        return res.status(400)
            .json({ error: e });
    }
}



// helper functions

// get new average
const newAvgScore = (ratingArray) => {
    let score = 0;
    ratingArray.forEach(elem => { score+=elem.score })

    return (score/ratingArray.length);
}



