import slugify from "slugify";
import CategoryModel from "../../../Models/CategoryModel.js";
import Cloudinary from "../../../Services/Cloudinary.js";
export const GetCategories = async (req,res,next)=>{
    const AllCategories = await CategoryModel.find().populate('SubCategory');
    return res.status(200).json({Message:"Displaying all Categories:",AllCategories})
}

export const CreateCategory = async (req,res,next)=>{
    const Name = req.body.Name.toLowerCase();
    const CheckCategory = await CategoryModel.findOne({Name});
    if(CheckCategory){
        return next(new Error("Invalid Password",{cause:400}));
    }
    const {secure_url,public_id} = await Cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/Categories`,
    })
    const Create = await CategoryModel.create({Name,Slug:slugify(Name),Image:{secure_url,public_id},
    CreatedBy:req.user._id,UpdatedBy:req.user._id});
    return res.status(201).json({Message:"Category Created Successfully",Create});
}

export const SpecificCategory = async (req,res,next)=>{
    const Category = await CategoryModel.findById(req.params.id);
    return res.status(200).json({Message:"Category Information:",Category});
}

export const GetActiveCategory = async(req,res,next)=>{
    const ActiveCategories = await CategoryModel.find({Status:'Active'}).select('Name Image');
    return res.status(200).json({Message:"Displaying Active Categories:",ActiveCategories})
}

export const UpdateCategory = async (req,res,next)=>{
    
    const Category = await CategoryModel.findById(req.params.id);
    if(!Category){
        return next(new Error(`Invalid Category ID: ${req.params.id}`,{cause:400}));
    }
    if(req.body.Name){
        if(await CategoryModel.findOne({Name:req.body.Name}).select("Name")){
            return next(new Error(`Category Name: ${req.body.Name} Already Exists`,{cause:409}));
        }
        Category.Name = req.body.Name;
        Category.Slug = slugify(req.body.Name);
    }
    if(req.body.Status){
        Category.Status = req.body.Status;
    }
    if(req.file){
        const {secure_url,public_id} = await Cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/Categories`,
        })
        await Cloudinary.uploader.destroy(Category.Image.public_id);
        Category.Image = {secure_url,public_id};
    }
    Category.UpdatedBy = req.user._id;

    await Category.save()
    return res.status(200).json({Message:"Success",Category});
}