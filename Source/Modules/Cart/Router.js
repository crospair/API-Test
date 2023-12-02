import { Router } from "express";
import * as CartController from './Controller.js'
import { Endpoint } from "./Endpoint.js";
import { Auth } from "../../Middleware/AuthMiddleware.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";

const Nav = Router();

Nav.post('/Create',Auth(Endpoint.Create),asyncHandler(CartController.CreateCart));
Nav.patch('/Remove',Auth(Endpoint.Remove),asyncHandler(CartController.RemoveItem));
Nav.patch('/Clear',Auth(Endpoint.Clear),asyncHandler(CartController.ClearCart));
Nav.get('/',Auth(Endpoint.Get),asyncHandler(CartController.GetCart));


export default Nav;