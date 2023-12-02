
import mongoose,{Schema,model,Types} from "mongoose";

const OrderSchema = new Schema({
    UserID:{
        type:Types.ObjectId,ref:'User',required:true
    },
    Products:[{
        ProductID:{type:Types.ObjectId,ref:'Product',required:true},
        Quantity:{type:Number,default:1,required:true},
        UnitPrice:{type:Number,required:true},
    }],
    FinalPrice:{
        type:Number,required:true
    },
    Address:{
        type:String,
        required:true,
    },
    PhoneNumber:{
        type:Number,
        required:true,
    },
    CouponName:{
        type:String,
        required:true,
    },
    PaymentType:{
        type:String,
        default:"By Cash",
        enum:["By Cash","By Card"],
    },
    Status:{
        type:String,
        default:"Pending",
        enum:["Pending","Cancelled","Confirmed","OnWay","Delivered"],
    },
    ReasonRejected:String,
    Note:String,
    UpdatedBy:{
        type:Types.ObjectId,ref:"User",
    },
},{
    timestamps:true,
})

const OrderModel = mongoose.models.Order || model("Order",OrderSchema);

export default OrderModel;