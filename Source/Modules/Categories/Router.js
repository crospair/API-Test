import { Router } from "express";
import { EndPoint } from "./Endpoint.js";
import * as Categories from "./Controller.js";
import SubCategoryRouter from '../SubCategory/Router.js'
import fileUpload, { FileTypes } from "../../../Services/Multer.js";
import { Auth, Roles } from "../../Middleware/AuthMiddleware.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
import { Validation } from "../../Middleware/Joi.js";
import * as Validators from './Validation.js'
const Nav = Router();

Nav.use('/:id/SubCategory',SubCategoryRouter);
Nav.get('/',Auth(EndPoint.GetAll),asyncHandler(Categories.GetCategories));
Nav.get('/Active',asyncHandler(Categories.GetActiveCategory));
Nav.delete('/:id',Auth(EndPoint.Delete),asyncHandler(Categories.DeleteCategory));
Nav.get('/:id',Validation(Validators.GetSpecificCategory),asyncHandler(Categories.SpecificCategory));
Nav.post('/Create',Auth(EndPoint.Create),fileUpload(FileTypes.image).single('Image'),Validation(Validators.CreateCategory),asyncHandler(Categories.CreateCategory));
Nav.put('/:id',Auth(EndPoint.Update),fileUpload(FileTypes.image).single('image'),Validation(Validators.UpdateCategory),asyncHandler(Categories.UpdateCategory));

export default Nav;