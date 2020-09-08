const { required } = require("joi");
const Joi  = require("joi");
// probably change to express-validator later

// temp, change this later to fir all the other required fields
module.exports.registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    return schema.validate(data);
}

module.exports.loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    return schema.validate(data);  
}