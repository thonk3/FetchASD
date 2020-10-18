/* 
    dog rating api routing
*/

// middleware
const router = require('express').Router();
const ratingController = require('../controllers/dogRating.controller');

// validation
const { runValidation } = require('../validators/runValidation');
// validation rule here

/* Changes
- Dog Schema
    - Score: rating score
    - Rating: [dogRatingSchema]

*/
// routes 
// set yor routes here

// check for past ratings
router.post('/check', ratingController.checkRating);
router.post('/new', /* validators */ ratingController.newRating);
router.post('/update', /* validators */ ratingController.updateRating);

// since the ratings are in dog model
// possibly handled in dog details pages (in kennel side + manage dog)

// update

// delete
router.post('/delete', /* validators */ ratingController.deleteRating);


/* 
    typical request contains
    header: token
    body: {
        dogID,
        rateBy,
        score,
        comment
    }
*/


module.exports = router;