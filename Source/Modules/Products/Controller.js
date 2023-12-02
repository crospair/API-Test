import slugify from "slugify";
import CategoryModel from "../../../Models/CategoryModel.js";
import SubCategoryModel from "../../../Models/SubCategoryModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";
import ProductModel from "../../../Models/ProductModel.js";

export const GetProducts = (req,res,next)=>{
    res.json({Message:"Products"});
}

export const CreateProduct = async (req,res,next)=>{
    const {Name,Price,Discount,CategoryID,SubCategoryID} = req.body;
    const CheckCategory = await CategoryModel.findById(CategoryID);
    if(!CheckCategory){
        return next(new Error("Category Not Found",{cause:404}));
    }
    const CheckSubCategory = await SubCategoryModel.findById(SubCategoryID);
    if(!CheckSubCategory){
        return next(new Error("SubCategory Not Found",{cause:404}));
    }
    req.body.Slug = slugify(Name);
    req.body.FinalPrice = Price - (Price * (Discount || 0) / 100).toFixed(2);
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
        return next(new Error("Error While Creating Product",{cause:400}));
    }
    return res.status(200).json({Message:"Success",Save});
}

export const UpdateProduct = async (req,res,next)=>{
    const Product = await ProductModel.findById(req.params.id);
    if(!Product){
        return next(new Error(`Invalid Product ID: ${req.params.id}`,{cause:400}));
    }
    if(req.body.Name){
        if(await ProductModel.findOne({Name:req.body.Name}).select("Name")){
            return next(new Error("Product Name Already in Use!",{cause:409}));
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