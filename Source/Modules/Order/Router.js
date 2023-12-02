import { Router } from "express";
import * as OrderController from './Controller.js';
import { EndPoint } from "./Endpoint.js";
import { Auth } from "../../Middleware/AuthMiddleware.js";
const Nav = Router();
Nav.get('/',Auth(EndPoint.Create),OrderController.CreateOrder);

export default Nav;