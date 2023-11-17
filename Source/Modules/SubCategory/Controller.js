import slugify from "slugify";
import CategoryModel from "../../../Models/CategoryModel.js";
import SubCategoryModel from "../../../Models/SubCategoryModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";

export const CreateSubCategory = async (req,res)=>{
    const {Name,CategoryID} = req.body;
    const SubCategory = SubCategoryModel.findOne({Name});
    if(SubCategory){
        return res.status(409).json({Message:`Sub Name ${Name} Already Exists`})
    }

    const CheckCategory = CategoryModel.findById(CategoryID);
    if(!CheckCategory){
        return res.status(404).json({Message:"Category Not Found"});
    }
    const {secure_url,public_id} = await Cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/SubCategories`,
    })
    const Create = await SubCategoryModel.create({Name,Slug:slugify(Name),CategoryID,Image:{secure_url,public_id}});
    return res.status(201).json({Message:"Success",Create});
}

export const GetSubCategory = async(req,res)=>{
    
    const CategoryID = req.params.id;
    const CheckCategory = await CategoryModel.findById(CategoryID);
    if(!CheckCategory){
        return res.status(404).json({Message:"Category Not Found"});
    }
    const Get = await SubCategoryModel.find({CategoryID}).populate({
        path:'CategoryID'
    });
    return res.status(201).json({Message:"Success",Get});
}