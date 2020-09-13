const express = require('express');
const mongoose = require('mongoose');
const Dog = require('../models/canineModel');
const User = require('../models/userModel');

exports.getDog = (req, res) => {
    Dog.find()
    .then((dogs) => {
        res.status(200).send(dogs);
    })
    .catch(err => res.status(400).json('Error' + err));
}

exports.getDogbyId = (req, res) => {
    Dog.findById(req.params.id)
    .then((dogs) => {
        res.status(200).send(dogs);
    })
    .catch(err => res.status(400).json('Error' + err));
}

exports.createDog = async (req, res) => {
    // Dog Object
    let newDog = new Dog(req.body);
    try {
        // save the dog to the database
        const savedDog = await newDog.save();
        // extract the object id from the recently saved dog 
        const dogId = savedDog._id;
        // find the user by the email
        const user = await User.findOneAndUpdate({ email: req.body.userEmail},
            //push the dog id into the dogs array
            { $push: {dogs: dogId}}
        );
        // Set response status to 200 OK
        res.status(200).json({'Dog': 'Dog added sucessfully'});

    } catch (err) {
        // There was an error set it to 400 response
        res.status(400).json(('Error' + err ));
    }
}