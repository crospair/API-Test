import { Router } from "express";
import * as CouponController from './Controller.js'
const Nav = Router();

Nav.post('/Create',CouponController.CreateCoupon);
Nav.get('/Get',CouponController.GetCoupons);
Nav.put('/:id',CouponController.UpdateCoupon);
Nav.patch('/SoftDelete/:id',CouponController.CouponSoftDelete);
Nav.delete('/HardDelete/:id',CouponController.CouponHardDelete);
Nav.patch('/Restore/:id',CouponController.CouponRestore);

export default Nav;