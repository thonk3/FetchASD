const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { registerValidation } = require("../validation");
const { valid, required } = require("joi");
const router = require("../routes/auth");

// this gucci
module.exports.Register = async (req, res) => {
    // validating input
    const { error } = registerValidation(req.body);
    if(error)
        return res.status(400).json({ error: error.details[0].message });

    // check existing email
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) 
        return res.status(400).json({ error: "Email already exist" });
        
    // can create now, hash password
    const salt = await bcrypt.genSalt(10); // change this value, move to .env later
    const password = await bcrypt.hash(req.body.password, salt);

    // user model object
    const user = new User({
        email: req.body.email,
        password,
    });

    // try save to db
    try {
        const savedUser = await user.save();
        res.json({ error: null, data: savedUser });
    } catch (error) {
        res.status(400).json({ error });
    }
}


