const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.getUsers = (req, res) => {
	User.find()
	.then((users) => {
		res.status(200).send(users);
	})
	.catch((err) => {
		res.status(500).send({
			message: err.message || "Error Occurred",
		});
	});
};