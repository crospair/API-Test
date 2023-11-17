import { Router } from "express";
import * as SubCategoryController from './Controller.js'
import fileUpload,{FileTypes} from "../../../Services/Multer.js";
const Nav = Router({mergeParams:true});

Nav.post('/Create',fileUpload(FileTypes.image).single('Image'),SubCategoryController.CreateSubCategory);
Nav.get('/',SubCategoryController.GetSubCategory);

export default Nav;