import mongoose,{Schema,model,Types} from "mongoose";
const SubCategorySchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    Slug:{
        type:String,
        required:true,
    },
    Image:{
        type:Object,
        required:true,
    },
    Status:{
        type:String,
        default:'Active',
        enum:['Active','Inactive'],
    },
    CategoryID:{type:Types.ObjectId,ref:'Category',required:true},
    CreatedBy:{type:Types.ObjectId,ref:'User'},
    EditedBy:{type:Types.ObjectId,ref:'User'},
},{
    timestamps:true,
})

const SubCategoryModel = mongoose.model.SubCategory || model('SubCategory',SubCategorySchema);

export default SubCategoryModel;