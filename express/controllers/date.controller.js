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

exports.acceptDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {
            res.status(400).send("Could not find dog date with that ID");
        } else {
            dogDate.status = "Upcoming";
            dogDate.save()
                .then(dogDate => {
                    res.json('Dog Date has been accepted');
                })
                .catch(err => {
                    res.status(400).send("Could not accept the dog date");
                });
        }
    });
}

exports.declineDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {
            res.status(400).send("Could not find dog date with that ID");
        } else {
            dogDate.deleteOne()
                .then(dogDate =>{
                    res.json("Dog Date request has been declined");
                }).catch(err => {
                    res.status(400).send("Could not decline the dog date");
                });
    }});
}