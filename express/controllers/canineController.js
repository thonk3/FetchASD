const express = require('express');
const mongoose = require('mongoose');
const Dog = require('../models/canineModel');

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

exports.createDog = (req, res) => {
    let newDog = new Dog(req.body);
    newDog.save()
        .then(newDog => {
            res.status(200).json({'Dog': 'Dog addded successfully'});
        })
        .catch(err => res.status(400).json('Error' + err));
}
