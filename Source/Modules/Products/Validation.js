import joi from 'joi';
import { GeneralFields } from '../../Middleware/Joi.js';

export const CreateProduct = joi.object({
    Name:joi.string().min(3).max(25).required(),
    Description:joi.string().min(10).max(2500),
    Stock:joi.number().integer().required(),
    Price:joi.number().positive().required(),
    Discount:joi.number().positive().min(1),
    File:joi.object({
        MainImage:joi.array().items(GeneralFields.File.required()).length(1),
        SubImages:joi.array().items(GeneralFields.File.required()).min(1).max(4),
    }),
    
    Status:joi.string().valid('Active','Inactive'),
    CategoryID:joi.string().required(),
    SubCategoryID:joi.string().required()
}).required()