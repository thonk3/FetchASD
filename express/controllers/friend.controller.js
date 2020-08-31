const express = require('express');
const mongoose = require('mongoose');
const Friend = require('../models/friend.model');

exports.getFriends = (req, res) => {
	Friend.find()
	.then(friend => res.json(friend))
	.catch(err => res.status(400).json('Error:' + err))
};