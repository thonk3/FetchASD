const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Sign Up Successful"
        })
    } catch (err) {
        return res.status(400).json('Error' + err)
    }
}

exports.listUser = async (req, res) => {
    try {
        let users = await User.find().select('userId firstName password')
        res.json(users)
    } catch (err) {
        return res.status(400).json('Error' + err)
    }
}