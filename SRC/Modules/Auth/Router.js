import { Router } from "express";
import * as AuthController from './Controller.js'
import fileUpload, { FileTypes } from "../../../Services/Multer.js";
const Nav = Router();

Nav.post('/Signup',fileUpload(FileTypes.image).single('ProfilePicture'),AuthController.SignUp);
Nav.post('/Signin',AuthController.Signin);

export default Nav;
