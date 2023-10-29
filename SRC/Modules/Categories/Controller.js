import slugify from "slugify";
import CategoryModel from "../../../Models/CategoryModel.js";
import cloudinary from "../../../Services/Cloudinary.js";
export const GetCategories = (req,res)=>{
    res.json({Message:"Categories"});
}

export const CreateCategory = async (req,res)=>{
    const Name = req.body.name.toLowerCase();
    const CheckCategory = await CategoryModel.findOne({Name});
    if(CheckCategory){
        res.status(409).json({Message:"Category Name Already Exists"})
    }
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/Categories`,
    })

    const Create = await CategoryModel.create({Name,Slug:slugify(Name),Image:{secure_url,public_id}});
    return res.status(201).json({Message:"Category Created Successfully",Create});
}

