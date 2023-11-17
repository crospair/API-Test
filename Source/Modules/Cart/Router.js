import { Router } from "express";
import * as CartController from './Controller.js'
import { Endpoint } from "./Endpoint.js";
import { Auth, Roles } from "../../Middleware/AuthMiddleware.js";

const Nav = Router();

Nav.post('/Create',Auth(Endpoint.Create),CartController.CreateCart);
Nav.patch('/Remove',Auth(Endpoint.Remove),CartController.RemoveItem);
Nav.patch('/Clear',Auth(Endpoint.Clear))
Nav.get('/',Auth(Endpoint.Get),CartController.GetCart);


export default Nav;