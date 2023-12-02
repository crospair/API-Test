import mongoose, {Schema,Types,model} from "mongoose";

const CouponSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    Amount:{
        type:Number,
        required:true
    },
    UsedBy:[{
        type:Types.ObjectId,ref:'User'
    }],

    ExpirationDate:{
        type:Date,
        required:true
    },

    CreatedBy:{type:Types.ObjectId,ref:'User'},
    EditedBy:{type:Types.ObjectId,ref:'User'},
    IsDeleted:{
        type:Boolean,
        default:false}
},{
    timestamps:true,
    
});

const CouponModel = mongoose.models.Coupon || model('Coupon',CouponSchema);
export default CouponModel;