import mongoose, {Schema,Types,model} from "mongoose";

const ProductSchema = new Schema({
    Name:{
        tyoe:String,
        required:true,
    }
})