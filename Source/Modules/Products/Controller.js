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
        return res.status(404).json({Message:"SubCategory Not Found"});
    }
    req.body.Slug = slugify(Name);
    req.body.FinalPrice = Price - (Price * (Discount || 0) / 100);
    const {secure_url,public_id} = Cloudinary.uploader.upload(req.files.MainImage[0].path,
        {folder:`${process.env.APP_NAME}/Products/${req.body.Name}/Main_Image`});
    req.body.MainImage = {secure_url,public_id};
    req.body.SubImages = [];
    for(const File of req.files.SubImages){
    const {secure_url,public_id} = Cloudinary.uploader.upload(File.path,{
        folder:`${process.env.APP_NAME}/Products/${req.body.Name}/Sub_Images`});
        req.body.SubImages = {secure_url,public_id}
    }
    req.body.CreatedBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    const Save = await ProductModel.create(req.body);
    if(!Save){
        return res.status(400).json({Message:"Error While Creating Product"});
    }
    return res.status(200).json({Message:"Success",Save});
}

export const UpdateProduct = async (req,res)=>{
    const Product = await ProductModel.findById(req.params.id);
    if(!Product){
        return res.status(400).json({Message:`Invalid Product ID:${req.params.id}`})
    }
    if(req.body.Name){
        if(await ProductModel.findOne({Name:req.body.Name}).select("Name")){
            return res.status(409).json({Message:"Product Name Already in Use"});
        }
        Product.Name = req.body.Name;
        Product.Slug = slugify(req.body.Name);
    }
    if(req.body.Status){
        Product.Status = req.body.Status;
    }
    if(req.file){
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/Products/'${req.body.Name}/MainImage`
        });
        await Cloudinary.uploader.destroy(Product.MainImage.public_id);
        Product.MainImage = {secure_url,public_id}
    }
    Product.UpdatedBy = req.user._id;
    await Product.save()
    return res.status(200).json({Message:"Success",Product});
}