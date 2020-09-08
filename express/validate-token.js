const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.handler("auth-token");
    
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