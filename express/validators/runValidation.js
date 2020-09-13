/* 
    Run the Validation, all validation needs this to work
*/

const { validationResult } = require('express-validator');


module.exports.runValidation = (req, res, next) => {
    const err = validationResult(req.body);

    console.log(req.body);

    // validation failed
    if(!err.isEmpty())
        return res.status(422).json({ error: err.array()[0].msg });

    // validation passed
    next();
}