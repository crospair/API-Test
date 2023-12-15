import { Router } from "express";
import * as OrderController from './Controller.js';
import { EndPoint } from "./Endpoint.js";
import { Auth } from "../../Middleware/AuthMiddleware.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
const Nav = Router();
Nav.post('/create',Auth(EndPoint.Create),asyncHandler(OrderController.CreateOrder));
Nav.patch('/cancel/:orderID',Auth(EndPoint.Cancel),asyncHandler(OrderController.CancelOrder));

export default Nav;
