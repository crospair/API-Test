import joi from "joi";
import { GeneralFields } from "../../Middleware/Joi.js";

export const SignupSchema = joi.object({
    Username: joi.string().required().alphanum().min(3).max(20),
    Email: GeneralFields.Email.required(),
    File: GeneralFields.File,
    Gender: joi.string().valid('Male', 'Female').required(),
    Password: GeneralFields.Password.required(),
    cPassword: joi.string().valid(joi.ref('Password')).required(),

})

export const SigninSchema = joi.object({
    Email: GeneralFields.Email.required(),
    Password: GeneralFields.Password.required()
})
