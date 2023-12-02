import joi from "joi";

export const GeneralFields = {
    Email:joi.string().email().required().min(5).messages({
        'string.empty':"Email is required",
        'string.email':"Please Provide a Valid Email"
    }),
    Password:joi.string().required().min(3).messages({
        'string.empty':"Please Enter Password",
    }),
    File:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
        dest:joi.string(),
    }),
}

export const Validation = (Schema)=>{
    return (req,res,next)=>{
        const InputData = {...req.body,...req.params,...req.query};
        if(req.file || req.files){
            InputData.File = req.file || req.files;
        }
        const ValidationResult = Schema.validate(InputData,{abortEarly:false});
        if(ValidationResult.error?.details){
            return res.status(400).json({Message:"Validation Error",ValidationError: ValidationResult.error?.details});
        }
        next();
    }
}