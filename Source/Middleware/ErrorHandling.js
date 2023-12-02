export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(error=>{
            //res.status(500).json({Message:"Caught Error",error:error.stack});
            return next(new Error(error.stack));
        })

    }
}
export const GlobalErrorHandler = (err,req,res,next)=>{
    return res.status(err.cause || 500).json({Message:err.message})
}