import CartModel from "../../../Models/CartModel.js"
import CouponModel from "../../../Models/CouponModel.js";
import OrderModel from "../../../Models/OrderModel.js";
import ProductModel from "../../../Models/ProductModel.js";

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

export const CancelOrder = async(req,res,next)=>{
    const {orderID} =req.params;
    const Order = await OrderModel.findOne({_id:orderID,UserID:req.user._id});
    if(!Order){
        return next(new Error(`Invalid Order`,{cause:404}));
    }
    if(Order.Status!="Pending"){
        return next(new Error(`Can't Cancel this Order`));
    }
    req.body.status = 'cancelled';
    req.body.UpdatedBy = req.user._id;
    const NewOrder = await OrderModel.findByIdAndUpdate(orderID,req.body,{new:true});
    for(const Product of Order.Products){
        await ProductModel.updateOne({_id:Product.ProductID},{$inc:{Stock:Product.Quantity}});
    }
    if(req.body.Coupon){
        await CouponModel.updateOne({_id:req.body.Coupon._id},{$pull:{UsedBy:req.user._id}})
    }
    return res.status(200).json({Message:"Success",NewOrder});
}

export const GetOrders = async(req,res,next)=>{
    const Orders = await OrderModel.find({UserID:req.user._id});
    return res.status(200).json({Message:"Success",Orders});
}

export const ChangeStatus = async(req,res,next)=>{
    const OrderID = req.params;
    const Order = await OrderModel.findById(OrderID);
    if(!Order){
        return next(new Error(`Order Not Found`,{cause:404}));
    }
    if(Order.Status=="Cancelled"||Order.Status=="Delivered"){
        return next(new Error("Can't Cancel This Order"));
    }
    const NewOrder = await OrderModel.findByIdAndUpdate({OrderID},{Status:req.body.status},{new:true});
    return res.json({Message:"Success",NewOrder});
}