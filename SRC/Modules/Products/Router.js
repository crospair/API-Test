import { Router } from "express";
import * as Products from "./Controller.js"

const Nav = Router();

Nav.get('/',Products.GetProducts)

export default Nav;