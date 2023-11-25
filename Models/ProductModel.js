import mongoose, {Schema,Types,model} from "mongoose";

const ProductSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    Slug:{
        type:String,
        required:true
    },
    Description:{
        type:String,
    },
    Stock:{
        type:String,
        default:1
    },
    Price:{
        type:String,
        required:true
    },
    Discount:{
        type:Number,
        default:0
    },
    FinalPrice:{
        type:Number,
    },
    AmountSold:{
        type:Number,
        default:0
    },
    MainImage:{
        type:Object,
        required:true
    },
    SubImages:{
        type:Object,
        required:true
    },
    Status:{
        type:String,
        default:"Active",
        enum:["Active",'Inactive']
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    CategoryID:{type:Types.ObjectId,ref:'Category',required:true},
    SubCategoryID:{type:Types.ObjectId,ref:'SubCategory',required:true},
    CreatedBy:{type:Types.ObjectId,ref:'User',required:true},
    UpdatedBy:{type:Types.ObjectId,ref:'User',required:true},
},{
    timestamps:true
}
)

const ProductModel = mongoose.models.Product || model('Product',ProductSchema)

export default ProductModel