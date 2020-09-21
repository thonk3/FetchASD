const express = require('express');
const mongoose = require('mongoose');
const Dog = require('../models/canine.model');

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