import { Router } from "express";
import * as ProductController from "./Controller.js"
import { EndPoint } from "./EndPoint.js";
import { Auth } from '../../Middleware/AuthMiddleware.js'
import fileUpload , {FileTypes} from "../../../Services/Multer.js";

const Nav = Router();

Nav.get('/',Auth(EndPoint.GetAll),ProductController.GetProducts)
Nav.post('/Create',Auth(EndPoint.Create),fileUpload(FileTypes.image).fields([
    {name:'MainImage',maxCount:1},
    {name:'SubImages',maxCount:4}
]),ProductController.CreateProduct)

export default Nav;