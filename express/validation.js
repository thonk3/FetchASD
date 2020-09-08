const { required } = require("joi");
const Joi  = require("joi");

module.exports.registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    return schema.validate(data);
}

