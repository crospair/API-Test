import mongoose from "mongoose";

const Connect = async ()=>{
    return await mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("Connected to Database.");
    }).catch((err)=>{
        console.log(`Connection Error: ${err}`);
    });
} 

export default Connect;