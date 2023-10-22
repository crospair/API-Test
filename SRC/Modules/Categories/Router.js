import { Router } from "express";
import * as Categories from "./Controller.js";

const Nav = Router();

Nav.get('/',Categories.GetCategories);

export default Nav;