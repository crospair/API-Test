import mongoose, {Schema,Types,model} from "mongoose";

const CategorySchema = new Schema({
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
    CreatedBy:{type:Types.ObjectId,ref:'User',required:true},
    UpdatedBy:{type:Types.ObjectId,ref:'User',required:true},
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
CategorySchema.virtual('SubCategory',{
    localField:"_id",
    foreignField:"CategoryID",
    ref:'SubCategory'
})
const CategoryModel = mongoose.models.Category || model('Category',CategorySchema);
export default CategoryModel;