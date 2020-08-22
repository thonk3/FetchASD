const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.getUsers = (req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json('Error:' + err))
};