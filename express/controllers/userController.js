const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const router = require('../routes/users');
const extend = require('../../node_modules/lodash')

module.exports.createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Sign Up Successful =)"
        })
    } catch (err) {
        return res.status(400).json('Error' + err)
    }
}

module.exports.listUser = async (req, res) => {
  try {
        let users = await User.find().select('email password')
        res.json(users)
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

module.exports.updateUser = async (req, res) => {
    try {
    //  tried this   
    // let user = User.findByIdAndUpdate(req.params.id, {$set:req.body})
    //    return res.json(user)
        let user = req.profile
        user = extend(user, req.body)
        await user.save()
        res.json(user)
    } catch (err) {
        return res.status(400).json('Error' + err)
    }
}