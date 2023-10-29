import { Router } from "express";
import * as Categories from "./Controller.js";
import FileUpload, { FileTypes } from "../../../Services/Multer.js";

const Nav = Router();

Nav.get('/',Categories.GetCategories);
Nav.post('/Create',FileUpload(FileTypes.image).single('image'),Categories.CreateCategory)

export default Nav;