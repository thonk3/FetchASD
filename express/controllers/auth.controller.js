/*
    authentication controller
*/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

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
    if(!checkPassword) return res.status(400).json({ error: "WRONG EMAIL/PASSWORD" });

    // create token
    const tokenPayload = {
        name: `${user.firstName} ${user.lastName}`,
        staff: user.isStaffUser,
        id: user._id,
    }
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET);

    // return token
    res.json({
        error: null,
        payload: {
            token,      // test in https://jwt.io/
            message: "YOURE IN",
        }
    })
}

