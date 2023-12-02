import joi from 'joi';

export const CreateCoupon = joi.object({
    Name:joi.string().min(3).max(20).required(),
    Amount:joi.number().required(),
    ExpirationDate:joi.date().greater('now').required(),
})