import cors from "cors";
import ProductsRouter from './Products/Router.js';
import CategoriesRouter from './Categories/Router.js';
import AuthRouter from './Auth/Router.js';
import SubCategoryRouter from './SubCategory/Router.js';
import CouponRouter from './Coupon/Router.js';
import Connect from '../../Database/Connection.js';
import CartRouter from './Cart/Router.js';
import ProductRouter from './Products/Router.js'
import OrderRouter from './Order/Router.js';
import UserRouter from './User/Router.js'
import { GlobalErrorHandler } from '../Middleware/ErrorHandling.js';

const InitiateApp = async (App,express)=>{
    App.use(cors())
    App.use(express.json());
    Connect();
    App.use('/Auth',AuthRouter);
    App.use('/Products',ProductsRouter);
    App.use('/Categories',CategoriesRouter);
    App.use('/SubCategory',SubCategoryRouter);
    App.use('/Coupon',CouponRouter);
    App.use('/Product',ProductRouter);
    App.use('/Cart', CartRouter);
    App.use('/Order',OrderRouter);
    App.use('/User',UserRouter);
    App.get('/',(req,res)=>{
        res.json({Message:"Welcome"})
    });
    App.get('*',(req,res)=>{
        res.json({Message:"Page Not Found"})
    });
    App.use(GlobalErrorHandler);
}

export default InitiateApp;