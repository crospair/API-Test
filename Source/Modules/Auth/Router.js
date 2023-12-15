import { Router } from "express";
import * as AuthController from './Controller.js'
import fileUpload, { FileTypes } from "../../../Services/Multer.js";
import { asyncHandler } from "../../Middleware/ErrorHandling.js";
import { Validation } from "../../Middleware/Joi.js";
import * as Validators from './Validation.js'
const Nav = Router();


Nav.post('/Signup',fileUpload(FileTypes.image).single('ProfilePicture'),Validation(Validators.SignupSchema),asyncHandler(AuthController.SignUp));
Nav.post('/Signin',Validation(Validators.SigninSchema),asyncHandler(AuthController.Signin));
Nav.get('/ConfirmEmail/:token',asyncHandler(AuthController.ConfirmEmail));
Nav.patch('/SendCode',asyncHandler(AuthController.ResetPassCode));
Nav.patch('/ResetPassword',asyncHandler(AuthController.ResetPassword));

export default Nav;
