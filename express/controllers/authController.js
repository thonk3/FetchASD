const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
import jwt from 'jsonwebtoken'

module.exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user){
            return res.status('401').json({ error: "Email and Password are incorrect."})
        }
        
        if (!(req.body.password==user.password)) {
            return res.status('401').send({ error : "Email and Password are incorrect."})
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        
        res.cookie('t', token, {expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status('401').json({ error: "Sign in Failed. You didn't get in :("})
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "You have been signed out."
    })
}