import { Router } from "express";
import * as ProductController from "./Controller.js"
import { EndPoint } from "./EndPoint.js";
import { Auth } from '../../Middleware/AuthMiddleware.js'
import fileUpload , {FileTypes} from "../../../Services/Multer.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";

const Nav = Router();

Nav.get('/',Auth(EndPoint.GetAll),asyncHandler(ProductController.GetProducts));
Nav.post('/Create',Auth(EndPoint.Create),fileUpload(FileTypes.image).fields([
    {name:'MainImage',maxCount:1},
    {name:'SubImages',maxCount:4}
]),asyncHandler(ProductController.CreateProduct));
Nav.put('/Update',Auth(EndPoint.Update),fileUpload(FileTypes.image).fields([
    {name:'MainImage',maxCount:1},
    {name:'SubImages',maxCount:4}
]),asyncHandler(ProductController.UpdateProduct));

export default Nav;