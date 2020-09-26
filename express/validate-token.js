/* 
this is to verify token, lock hide api calls for users only 
*/

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    
    // no token
    if(!token)
        return res.status(401).json({ error: "ACCESS DENIED" });

    // verify token
    try {
        const verified = jwt.verify( token, process.env.TOKEN_SECRET );
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: "BAD TOKEN" });
    }
}

module.exports = verifyToken;