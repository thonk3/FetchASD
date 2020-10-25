/*
    authentication controller
*/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Log = require("../models/log.model");
const fs = require('fs');

module.exports.register = async (req, res) => {
    // check existing email
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).json({ error: "Email already exist" });
        
    // securing password
    const salt = await bcrypt.genSalt(parseInt(process.env.PASS_SALT_ROUNDS));
    const passHash = await bcrypt.hash(req.body.password, salt);

    // new user object
    const user = new User({
        ...req.body,
        password: passHash,
    });

    
    try {   // save to mongo
        const savedUser = await user.save();
        return res.json({ error: null, newUser: savedUser });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.login = async (req, res) => {


    // check matching email
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({ error: "WRONG EMAIL/PASSWORD" });



    // check matching password
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword) {
        const salt = await bcrypt.genSalt(parseInt(process.env.PASS_SALT_ROUNDS));
        const passHash = await bcrypt.hash(req.body.password, salt);
        const log = new Log({
            email : req.body.email,
            password : passHash,
            dateTime : new Date(),
            logIn : false
        })
        const newLog = await log.save();
        console.log(newLog);
        return res.status(400).json({ error: "WRONG EMAIL/PASSWORD" });
    }
    else{
        const salt = await bcrypt.genSalt(parseInt(process.env.PASS_SALT_ROUNDS));
        const passHash = await bcrypt.hash(req.body.password, salt);
        const log = new Log({
            email : req.body.email,
            password : passHash,
            dateTime : new Date(),
            logIn : true
        })
        const newLog = await log.save();
        console.log(newLog);
    }
    

    // create token
    const tokenPayload = {
        name: `${user.firstName} ${user.lastName}`,
        staff: user.isStaffUser,
        id: user._id,
    }

    const token = jwt.sign(
        tokenPayload, 
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    // return token
    res.json({
        error: null,
        payload: {
            token,      // test in https://jwt.io/
            message: "YOURE IN",
        }
    })
}

module.exports.changePassword = async (req, res) => {
    const user = await User.findById(req.params.id);
        const salt = await bcrypt.genSalt(parseInt(process.env.PASS_SALT_ROUNDS));
        const passHash = await bcrypt.hash(req.body.newPassword, salt);
        user.password = passHash;
        try {
            await user.save();
            return res.status(200);
        }  catch (error) {
            return res.status(400).json({ error });
        }
        
}

module.exports.checkPassword = async (req, res) => {
    const user = await User.findById(req.params.id);

    try {
        const checkPassword = await bcrypt.compare(req.body.currentPass, user.password);
        console.log(req.body);
        if (checkPassword) {
            console.log("check OK");
            return res.status(200).json({ msg: "Password Matches"})
        } 
        if(!checkPassword){
            return res.status(400).json({ error: "WRONG PASSWORD" });
        } 
    } catch (error) {
        console.log("error")
        console.log(error)
        return;
    }


}

module.exports.getLogs = async (req, res) => {
    try {
        let logs = await Log.find().select('email password dateTime logIn');
        return res.status(200).send(logs);
    } catch (err) {
        return res.status(400).json('Error' + err); 
    }
}