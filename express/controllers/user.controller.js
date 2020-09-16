const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Dog = require('../models/dog.model');
const router = require('../routes/users');

module.exports.listUsers = async (req, res) => {
    try {
          let users = await User.find().select('email password')
          res.json(users)
      } catch (err) {
          return res.status(400).json('Error' + err)
      }
}

// Method to get a particular user's dogs and display it
// as a series of json dog objects
module.exports.userGetDogs = async (req, res) => {
    try {
        // find the user by their _id provided by mongodb
        const user = await User.findById(req.params.id)
        // if we cannot find the user provided an error
        if(!user)
            return res.status(400).json('Error' + err)
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
        return res.json(newDogsArray);
    } catch (err) {
        // if error give error
        return res.status(400).json('Error' + err)
    }
}

module.exports.userByID = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if(!user)
            return res.status(400).json('Error' + err)
        return res.json(user)
    } catch (err) {
        return res.status(400).json('Error' + err)
    }
}
