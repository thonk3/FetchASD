/* 
    Run the Validation, all validation needs this to work
*/

const { validationResult } = require('express-validator');


module.exports.runValidation = (req, res, next) => {
    const err = validationResult(req);

    // validation failed
    if(!err.isEmpty()) return res.status(422).json({ error: mapError(err.errors)  })
    
    next();
}

function mapError( errors ) {
    return errors.map(err => {
        return {
            param: err.param,
            msg: err.msg
        }
    });
}