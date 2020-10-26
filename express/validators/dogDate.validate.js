const { check } = require('express-validator');
const DogDate = require('../models/dogDate.model')
const Dog = require('../models/dog.model')
const mongoose = require('mongoose')

module.exports.createDateValidator = [
    check('senderDogID')
        .isMongoId().bail()
        .withMessage("The ID of the dog is not valid")
        .custom(async value => {
            const userID = mongoose.Types.ObjectId(value)
            const dog = await Dog.find({ _id: userID });
            if(!dog.length > 0)
                return Promise.reject('That dog cannot be found in the database')
        }),
    check('receiverDogID')
        .isMongoId().bail()
        .withMessage("The ID of the dog is not valid")
        .custom(async value => {
            const userID = mongoose.Types.ObjectId(value)
            const dog = await Dog.find({ _id: userID });
            if(!dog.length > 0)
                return Promise.reject('That dog cannot be found in the database')
        }),
    check('status')
        .trim()
        .isString()
        .withMessage("The status of the date must be a string")
        .equals("Requested")
        .withMessage("The status of a newly created date must be Requested"),
    check('dateOn')
        .trim()
        .isISO8601()
        .withMessage("The date must be stored in ISO8601 format")
        .isAfter()
        .withMessage("The date of the date must be after today"),
    check('location')
        .trim()
        .notEmpty()
        .withMessage("You must add a location for the date")
        .isString()
        .withMessage("The location must be a string")
]