import CouponModel from "../../../Models/CouponModel.js";

export const CreateCoupon = async (req,res,next)=>{
    const {Name} =  req.body;
    req.body.ExpirationDate = new Date(req.body.ExpirationDate);
    if(await CouponModel.findOne({Name})){
        return next(new Error("Coupon Name Already Exists",{cause:409}));
    }
    const Created = await CouponModel.create(req.body);
    return res.status(201).json({Message:'Success',Created});
}

export const GetCoupons = async (req,res,next)=>{
    const Get = await CouponModel.find({IsDeleted:false}).select('Name Amount');
    return res.status(201).json({Message:'Success',Get})
}

export const UpdateCoupon = async (req,res,next)=>{
    const Coupon = await CouponModel.findById(req.params.id);
    if(!Coupon){
       return next(new Error("Coupon Doesn't Exist",{cause:404}));
    }
    if(req.body.Name){
        if(await CouponModel.findOne({Name:req.body.Name}).select('Name')){
        return next(new Error("Coupon Name Already in Use!",{cause:409}));
        }
        Coupon.Name = req.body.Name;
    }
    if(req.body.Amount){
        Coupon.Amount = req.body.Amount
    }
    await Coupon.save();
    return res.status(201).json({Message:"Success",Coupon});

}

export const CouponSoftDelete = async (req,res,next)=>{
    const {id} =req.params;
    const Coupon = await CouponModel.findOneAndUpdate({_id:id,IsDeleted:false},
        {IsDeleted:true},
        {new:true});
    if(!Coupon){
        return next(new Error("ICannot Delete this Coupon",{cause:400}));
    }
    return res.status(201).json({Message:'Soft Delete Successful'});
}

export const CouponHardDelete = async (req,res,next)=>{
    const {id}  = req.params;
    const Delete = await CouponModel.findOneAndDelete({_id:id});
    if(!Delete){
        return next(new Error("Cannot Hard Delete this Coupon",{cause:400}));
    }
    return res.status(201).json({Message:'Successfully Deleted this Coupon'});
}

export const CouponRestore = async (req,res,next)=>{
    const {id} =  req.params;
    const Restore = await CouponModel.findOneAndUpdate({_id:id,IsDeleted:true},
        {IsDeleted:false},
        {new:true});
    if(!Restore){
        return next(new Error("Cannot Restore this Coupon",{cause:400}));
    }
    return res.status(201).json({Message:"Successfully Restored This Coupon"});
}