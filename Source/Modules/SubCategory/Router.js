import { Router } from "express";
import * as SubCategoryController from './Controller.js'
import fileUpload,{FileTypes} from "../../../Services/Multer.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
const Nav = Router({mergeParams:true});

Nav.post('/Create',fileUpload(FileTypes.image).single('Image'),asyncHandler(SubCategoryController.CreateSubCategory));
Nav.get('/',asyncHandler(SubCategoryController.GetSubCategory));

export default Nav;