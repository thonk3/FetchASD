const express = require('express');
const mongoose = require('mongoose');
const DogDate = require('../models/dogDate.model');

exports.getDates = (req, res) => {
	DogDate.find()
	.then(dogDate => res.json(dogDate))
	.catch(err => res.status(400).json('Error:' + err))
};

exports.createDate = (req, res) => {
    let dogDate = new DogDate(req.body);
    dogDate.save()
        .then(dogDate => {
            res.status(200).json({'Date': 'Date added successfully'});    
    })
    .catch(err => {
        res.status(400).send('Could not add the Date');    
    });
}