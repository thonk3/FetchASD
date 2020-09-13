const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Dog = require('../models/canineModel');
const router = require('../routes/users');

module.exports.listUsers = async (req, res) => {
    try {
          let users = await User.find().select('email password')
          res.json(users)
      } catch (err) {
          return res.status(400).json('Error' + err)
      }
}

module.exports.userGetDogs = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        let dogsArray = user.dogs;
        let newDogsArray = [];
        for (i = 0; i < dogsArray.length; i++) {
            let newDog = await Dog.findById(dogsArray[i]);
            newDogsArray.push(newDog);
        }
        if(!user)
            return res.status(400).json('Error' + err)
        return res.json(newDogsArray);
    } catch (err) {
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
