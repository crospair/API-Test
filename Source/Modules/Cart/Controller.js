import CartModel from "../../../Models/CartModel.js"

export const GetCart = async (req,res,next)=>{
    const Cart = await CartModel.findOne({UserID:req.user._id});
    return res.status(201).json({Message:"Displaying Cart Components:",Cart});
}

export const CreateCart = async (req,res,next)=>{
    const {ProductID,Quantity} = req.body
const Cart = await CartModel.findOne({UserID:req.user._id});
if(!Cart){
    const NewCart = await CartModel.create({
        UserID : req.user._id,
        Products:{ProductID,Quantity}
    });
    return res.status(201).json({Message:"Success",NewCart});
}
    let Flag = false
    for(let i = 0; i<Cart.Products.length;i++){
        if(Cart.Products[i].ProductID == ProductID){
            Cart.Products[i].Quantity = Quantity;
            Flag = true;
            break;
        }
    }
    if(!Flag){
        Cart.Products.push(ProductID,Quantity);
    }
    await Cart.save();

return res.status(201).json({Message:"Success",Cart});
}

export const RemoveItem = async (req,res,next)=>{
    const {ProductID} = req.body;
    const Cart = await CartModel.findOneAndUpdate({UserID:req.user._Id},{
        $pull:{
            Products:{
                ProductID
            }
        }
    });
    return res.json({Message:"Item Removed Successfully"});
}

export const ClearCart = async (req,res,next)=>{
    const ClearCart = await CartModel.findOneAndUpdate({UserID:req.user._id},{
        Products: []},
        {new:true});
    return res.status(201).json({Message:"Success",ClearCart});
}

