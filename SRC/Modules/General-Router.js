import ProductsRouter from './Products/Router.js'
import CategoriesRouter from './Categories/Router.js'
import AuthRouter from './Auth/Router.js'
import Connect from '../../Database/Connection.js';

const InitiateApp = (App,express)=>{
    App.use(express.json());
    Connect();
    App.use('/Auth',AuthRouter)
    App.use('/Products',ProductsRouter);
    App.use('/Categories',CategoriesRouter);
    App.get('/',(req,res)=>{
        res.json({Message:"Welcome"})
    })
    App.get('*',(req,res)=>{
        res.json({Message:"Page Not Found"})
    })
}

export default InitiateApp;