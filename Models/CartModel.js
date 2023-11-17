import mongoose, { Schema, Types, model } from "mongoose";

const CartSchema = new Schema({
    UserID:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    Products:[{
        ProductID:{type:Types.ObjectId,ref:"Product",required:true},
        Quantity:{type:Number,default:1,required:true},
    }]
},{
    timestamps:true,
});

const CartModel = mongoose.models.Cart || model('Cart',CartSchema);

export default CartModel;