import { Router } from "express";
import { EndPoint } from "./Endpoint.js";
import * as Categories from "./Controller.js";
import SubCategoryRouter from '../SubCategory/Router.js'
import fileUpload, { FileTypes } from "../../../Services/Multer.js";
import { Auth } from "../../Middleware/AuthMiddleware.js";
const Nav = Router();

Nav.use('/:id/SubCategory',SubCategoryRouter);
Nav.get('/',Auth(EndPoint.GetAll),Categories.GetCategories);
Nav.get('/Active',Auth(EndPoint.GetActive),Categories.GetActiveCategory);
Nav.get('/:id',Auth(EndPoint.GetSpecific),Categories.SpecificCategory);
Nav.post('/Create',Auth(EndPoint.Create),fileUpload(FileTypes.image).single('Image'),Categories.CreateCategory)
Nav.put('/:id',Auth(EndPoint.Update),fileUpload(FileTypes.image).single('image'),Categories.UpdateCategory);

export default Nav;