import 'dotenv/config';
import cors from "cors";
import express from 'express';
import InitiateApp from './Source/Modules/General-Router.js';

const App = express();
const PORT = 3000;

InitiateApp(App,express);

App.listen(PORT,()=>{
    console.log(`App Listening On Port ${PORT}!`);
})
