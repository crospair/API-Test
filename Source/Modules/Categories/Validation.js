import joi from 'joi';
import { GeneralFields } from '../../Middleware/Joi.js';


export const CreateCategory = joi.object({
    Name:joi.string().min(2).max(20).required(),
    File:GeneralFields.File.required()
})

export const UpdateCategory = joi.object({
    Name:joi.string().min(2).max(20).required(),
    Status:joi.string().valid("Active","Inactive"),
    File:GeneralFields.File.required()
})

export const GetSpecificCategory = joi.object({
    ID:joi.string().min(24).max(24).required(),
})
