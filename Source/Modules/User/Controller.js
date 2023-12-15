import UserModel from "../../../Models/UserModel.js"

export const GetProfile = async (req,res,next)=>{
    const User = await UserModel.findById(req.user._id);
    return res.status(200).json({Message:"Success",User});
}