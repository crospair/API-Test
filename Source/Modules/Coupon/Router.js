import { Router } from "express";
import * as CouponController from './Controller.js'
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
import { Validation } from '../../Middleware/Joi.js'
import * as Validators from './Validation.js'
const Nav = Router();

Nav.post('/Create',Validation(Validators.CreateCoupon),asyncHandler(CouponController.CreateCoupon));
Nav.get('/Get',asyncHandler(CouponController.GetCoupons));
Nav.put('/:id',asyncHandler(CouponController.UpdateCoupon));
Nav.patch('/SoftDelete/:id',asyncHandler(CouponController.CouponSoftDelete));
Nav.delete('/HardDelete/:id',asyncHandler(CouponController.CouponHardDelete));
Nav.patch('/Restore/:id',asyncHandler(CouponController.CouponRestore));

export default Nav;