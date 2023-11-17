import slugify from "slugify";
import CategoryModel from "../../../Models/CategoryModel.js";
import SubCategoryModel from "../../../Models/SubCategoryModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";
import { nanoid } from "nanoid";
import ProductModel from "../../../Models/ProductModel.js";

export const GetProducts = (req,res)=>{
    res.json({Message:"Products"});
}

export const CreateProduct = async (req,res)=>{
    const {Name,Price,Discount,CategoryID,SubCategoryID} = req.body;
    const CheckCategory = await CategoryModel.findById(CategoryID);
    if(!CheckCategory){
        return res.status(404).json({Message:"Category Not Found"});
    }
    const CheckSubCategory = await SubCategoryModel.findById(SubCategoryID);
    if(!CheckSubCategory){
        return res.status(404).json({Message:"SubCategory  Not Found"});
    }
    req.body.Slug = slugify(Name);
    req.body.FinalPrice = Price - (Price * (Discount || 0) / 100);
    const {secure_url,public_id} = Cloudinary.uploader.upload(req.files.MainImage[0],
        {folder:`${process.env.APP_NAME}/Products/${req.body.Name}/Main_Image`});
    req.body.MainImage = {secure_url,public_id};
    req.body.SubImages = [];
    for(const File of req.files.SubImages){
    const {secure_url,public_id} = Cloudinary.uploader.upload(File.path,{
        folder:`${process.env.APP_NAME}/Products/${req.body.Name}/Sub_Images`});
        req.body.SubImages = {secure_url,public_id}
    }
    req.body.CreatedBy = req.User._id;
    req.body.UpdatedBy = req.User._id;
    const Save = await ProductModel.create(req.body);
    if(!Save){
        return res.status(400).json({Message:"Error While Creating Product"});
    }
    return res.status(200).json({Message:"Success",Save});
}