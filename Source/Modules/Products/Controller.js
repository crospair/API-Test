import slugify from "slugify";
import CategoryModel from "../../../Models/CategoryModel.js";
import SubCategoryModel from "../../../Models/SubCategoryModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";
import ProductModel from "../../../Models/ProductModel.js";
import { Pagination } from "../../../Services/Pagination.js";
import { Query } from "mongoose";

export const GetProducts = async (req,res,next)=>{
    
    const {skip,limit} = Pagination(req.query.page,req.query.limit);
    let QueryObj = {...req.query};
    const ExecQuery = ['page','limit','skip','sort','search','fields'];
    ExecQuery.map((ele)=>{
        delete QueryObj[ele];
    })
    QueryObj = JSON.stringify(QueryObj);
    QueryObj = QueryObj.replace(/\b(gte|lte|in|nin|eq|neq)\b/g,match =>`$${match}`)
    QueryObj = JSON.parse(QueryObj)
    const MongooseQuery = ProductModel.find(QueryObj).limit(limit).skip(skip);
    if(req.query.search){
    MongooseQuery.find({
       $or:[
        {Name:{$regex:req.query.search,$options:'i'}},
        {Description:{$regex:req.query.search,$options:'i'}}
       ]
    })
    MongooseQuery.select(req.query.fields?.replaceAll(',',' '))
}
    const Products = await MongooseQuery.sort(req.query.sort?.replaceAll(',',' '));
    const Count = await ProductModel.estimatedDocumentCount();
    return res.json({Message:"Success",Showing:Products.length,Total:Count,Products});

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
    if(req.files && req.files.MainImage && Array.isArray(req.files.MainImage)){
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.files.MainImage[0].path,
            {folder:`${process.env.APP_NAME}/Products/${req.body.Name}/Main_Image`});
        req.body.MainImage = {secure_url,public_id};
    }
    
    if (req.files && req.files.SubImages && Array.isArray(req.files.SubImages)) {
        const uploadedImages = [];
    
        for (let file of req.files.SubImages) {
            const { secure_url, public_id } = await Cloudinary.uploader.upload(file.path, {
                folder: `${process.env.APP_NAME}/Products/${req.body.Name}/Sub_Images`
            });
            uploadedImages.push({ secure_url, public_id });
        }
    
        req.body.SubImages = uploadedImages;
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

export const GetProductWithCategory = async(req,res,next)=>{
    const Products = await ProductModel.find({CategoryID:req.params.CategoryID});
    return res.status(200).json({Message:"Success",Products})
}