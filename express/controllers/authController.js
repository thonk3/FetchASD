const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// this gucci
module.exports.Register = async (req, res) => {
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
        console.log("new user created");
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports.Login = async (req, res) => {
    // check matching email
    const user = await User.findOne({ email: req.body.email });
    if(!user)
        return res.status(400).json({ error: "WRONG EMAIL/PASSWORD" });

    // check matching password
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword)
        return res.status(400).json({ error: "WRONG EMAIL/PASSWORD" });

    // create token
    const token = jwt.sign({
        email: user.email,      // just here for testing
        id: user._id,
        }, process.env.TOKEN_SECRET
    );

    // logged in
    res.json({
        error: null,
        data: {
            token,      // test in https://jwt.io/
            message: "YOURE IN",
        }
    })
}


