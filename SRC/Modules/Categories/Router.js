import { Router } from "express";
import * as Categories from "./Controller.js";
import FileUpload, { FileTypes } from "../../../Services/Multer.js";

const Nav = Router();

Nav.get('/',Categories.GetCategories);
Nav.get('/Active',Categories.GetActiveCategory);
Nav.get('/:id',Categories.SpecificCategory);
Nav.post('/Create',FileUpload(FileTypes.image).single('image'),Categories.CreateCategory)
Nav.put('/:id',FileUpload(FileTypes.image).single('image'),Categories.UpdateCategory);

export default Nav;