import jwt from "jsonwebtoken";
import UserModel from "../../Models/UserModel.js";

export const Auth = (AccessRoles = [])=>{
    return async (req,res,next)=>{
        const {Authorization} = req.headers;
        if(!Authorization?.startsWith(process.env.BEARERKEY)){
            return res.status(400).json({Message:"Invalid Authorization"});
        }
        const token = Authorization.split(process.env.BEARERKEY);
        const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);
        if(!decoded){
            return res.status(400).json({Message:"Invalid Token"});
        }
        const User = await UserModel.findById(decoded.id).select("Username Role");
        if(!User){
            return res.status(400).json({Message:'User Nonexistent'});
        }
        if(AccessRoles.includes(User.Role)){
            return res.status(403).json({Message:'403 Forbidden'})
        }
        req.user = User;
        next()
    }
}