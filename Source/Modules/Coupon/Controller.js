import CouponModel from "../../../Models/CouponModel.js";

export const CreateCoupon = async (req,res)=>{
    const {Name,Amount} =  req.body;
    if(await CouponModel.findOne({Name})){
        return res.status(409).json({Message:'Coupon Name Already Exists'});
    }
    const Created = await CouponModel.create(req.body);
    return res.status(201).json({Message:'Success',Created});
}

export const GetCoupons = async (req,res)=>{
    const Get = await CouponModel.find({IsDeleted:false}).select('Name Amount');
    return res.status(201).json({Message:'Success',Get})
}

export const UpdateCoupon = async (req,res)=>{
    const Coupon = await CouponModel.findById(req.params.id);
    if(!Coupon){
       return res.status(404).json({Message:'Coupon Doesnt exist'})
    }
    if(req.body.Name){
        if(await CouponModel.findOne({Name:req.body.Name}).select('Name')){
        return res.status(409).json({Message:'Coupon Name Already in Use!'});
        }
        Coupon.Name = req.body.Name;
    }
    if(req.body.Amount){
        Coupon.Amount = req.body.Amount
    }
    await Coupon.save();
    return res.status(201).json({Message:"Success",Coupon});

}

export const CouponSoftDelete = async (req,res)=>{
    const {id} =req.params;
    const Coupon = await CouponModel.findOneAndUpdate({_id:id,IsDeleted:false},
        {IsDeleted:true},
        {new:true});
    if(!Coupon){
        return res.status(400).json({Message:'Cannot Delete This Coupon'});
    }
    return res.status(201).json({Message:'Soft Delete Successful'});
}

export const CouponHardDelete = async (req,res)=>{
    const {id}  = req.params;
    const Delete = await CouponModel.findOneAndDelete({_id:id});
    if(!Delete){
        return res.status(400).json({Message:'Cannot Hard Delete this Coupon'});
    }
    return res.status(201).json({Message:'Successfully Deleted this Coupon'});
}

export const CouponRestore = async (req,res)=>{
    const {id} =  req.params;
    const Restore = await CouponModel.findOneAndUpdate({_id:id,IsDeleted:true},
        {IsDeleted:false},
        {new:true});
    if(!Restore){
        return res.status(400).json({Message:"Cannot Restore This Coupon"});
    }
    return res.status(201).json({Message:"Successfully Restored This Coupon"});
}