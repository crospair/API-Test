import mongoose ,{ Schema,model,Types } from "mongoose";

const BrandSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    Logo:{
        type:Object,
        required:true,
    },
    Slug:{
        type:String,
        required:true,
    },
    Status:{
        type:String,
        default:'Active',
        enum:["Active","Inactive"],
    },
    CreatedBy:{type:Types.ObjectId,ref:'User',required:true},
    UpdatedBy:{type:Types.ObjectId,ref:'User',required:true},
},{
    timestamps:true,
})

const BrandModel = mongoose.models.BrandSchema || model('Brand',BrandSchema);

export default BrandModel;