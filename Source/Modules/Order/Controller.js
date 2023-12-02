import CartModel from "../../../Models/CartModel.js"
import CouponModel from "../../../Models/CouponModel.js";

export const CreateOrder = async(req,res,next)=>{
    const {CouponName} = req.body
    const CheckCart = await CartModel.findOne({UserID:req.user._id});
    if(!CheckCart){
        return next(new Error("Empty Cart",{cause:400}));
    }
    req.body.Products = CheckCart.Products;
    

    if(CouponName){
        const Coupon = await CouponModel.findOne({Name:CouponName});
        if(!Coupon){
            return next(new Error("Coupon Nonexistent", {cause:400}));
        }
        const CurrentDate = new Date();
        if(Coupon.ExpirationDate <= CurrentDate){
            return next(new Error("This Coupon Has Expired",{cause:400}));
        }
        if(Coupon.UsedBy.includes(req.user._id)){
            return next(new Error("This Coupon Has Already Been Redeemed",{cause:409}))
        }
        req.body.Coupon = Coupon;
    }
    return res.json({Message:"Success"});
}