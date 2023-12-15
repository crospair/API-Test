import { Router } from "express";
import { Auth, Roles } from "../../Middleware/AuthMiddleware.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
import * as UserController from './Controller.js'
const Nav = Router();

Nav.get('/profile',Auth(Object.values(Roles)),asyncHandler(UserController.GetProfile))

export default Nav;