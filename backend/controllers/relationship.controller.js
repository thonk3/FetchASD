const express = require('express');
const mongoose = require('mongoose');
let UserSchema = require('../models/user.model');

const User = UserSchema.User;

const getUser = (req, res) => {
    User.find()
	.then(user => res.json(user))
	.catch(err => res.status(400).json('Error:' + err));
}