import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';
import UserModel from "../../../Models/UserModel.js";
import cloudinary from '../../../Services/Cloudinary.js';
import { SendEmail } from '../../../Services/NodeMailer.js';

export const SignUp = async (req,res)=>{
    const {Username, Email, Password, Gender} = req.body
    const Check = await UserModel.findOne({Email});
    if(Check){
        return res.status(409).json({Message:"Email Already Exists"});
    }
    const HashedPass = bcrypt.hashSync(Password,parseInt(process.env.SALTROUND));

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/Users`
    })

    const {Token} = jwt.sign({Email},process.env.CONFIRMSECRET)

    await SendEmail(Email,"Verification",`<a href='${req.protocol}://${req.headers.host}/Auth/ConfirmEmail/${Token}'>Welcome</a>`)

    const CreateUser = await UserModel.create({Username,Email,Password:HashedPass,ProfilePicture:{secure_url,public_id},Gender});
    return res.status(200).json({Message:"Success",CreateUser});
}
export const Signin = async (req,res)=>{
    const {Email,Password} = req.body;
    const User = await UserModel.findOne({Email});
    if(!User){
        return res.status(400).json({Message:"Invalid Account"});
    }
    const Match = bcrypt.compareSync(Password,User.Password);
    if(!Match){
        return res.status(400).json({Message:"Invalid Password"});
    }
    const Token = jwt.sign({ID:User._id,Role:User.Role,Status:User.Status},process.env.LOGINSIGNATURE,
        {expiresIn: '50m'});
    const RefreshToken = jwt.sign({ID:User._id,Role:User.Role,Status:User.Status},process.env.LOGINSIGNATURE,
        {expiresIn: 60*60*24})
    return res.status(200).json({Message:"Success",Token,RefreshToken});
}

export const ConfirmEmail = async(req,res)=>{
    const Token = req.params.token;
    const VerifyDecoded = jwt.verify(Token,process.env.CONFIRMSECRET);
    if(!VerifyDecoded){
        return res.status(404).json({Message:"Invalid Token"});
    }
    const User = await UserModel.findOneAndUpdate({Email:VerifyDecoded.Email,Confirmed:false},
        {Confirmed:true}
        );
        if(!User){
            return res.status(400).json({Message:"Invalid Verification Or Email Has Been Already Confirmed"});
        }
        return res.status(200).json({Message:"Successfully Verified This Email"});
}

export const ResetPassCode = async (req,res)=>{
    const {Email} = req.body;
    let Code = customAlphabet('123ABC',4);
    Code = Code();
    const User = await UserModel.findOneAndUpdate({Email},{SendCode:Code},{new:true});
    const HTML = `<h2>Code is: ${Code}</h2>`
    await SendEmail(Email,"Reset Password",HTML)
    return res.status(200).json({Message:"Success",User})
}

export const ResetPassword = async (req,res)=>{
    const {Email,Password,Code} =req.body
    const User = await UserModel.findOne({Email});
    if(!User){
        return res.status(404).json({Message:"Email Not Found"});
    }
    if(User.SendCode != Code){
        return res.status(400).json({Message:"Invalid Code"});
    }
    let match = bcrypt.compare(Password,User.Password);
    if(match){
        return res.status(409).json({Message:"New Password Cannot be Same as Old Password"});
    }
    User.Password = await bcrypt.hash(Password,parseInt(process.env.SALTROUND));
    User.SendCode = null;
    await User.save();
    return res.status(200).json({Message:"Success"});
}