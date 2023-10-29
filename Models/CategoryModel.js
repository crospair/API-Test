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
    CreatedBy:{type:Types.ObjectId,ref:'User'},
    EditedBy:{type:Types.ObjectId,ref:'User'},
},{
    timestamps:true,
});

const CategoryModel = mongoose.models.Category || model('Category',CategorySchema);
export default CategoryModel;