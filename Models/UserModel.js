import mongoose, {Schema,model} from "mongoose";

const UserSchema = new Schema({
    Username:{
        type:String,
        required:[true, 'Username is Required'],
        min:4,
        max:20,
    },
    Email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true,
    },
    Confirmed:{
        type:Boolean,
        default:false,
    },
    Password:{
        type:String,
        required:true,
    },
    ProfilePicture:{
        type:Object,
        required:true,
    },
    PhoneNumber:{
        type:String,
    },
    Address:{
        type:String,
    },
    Status:{
        type:String,
        default:'Active',
        enum:['Active','Inactive'],
    },
    Role:{
        type:String,
        default:'User',
        enum:['User','Admin'],
    },
    Gender:{
        type:String,
        default:"Unspecified",
        enum:['Male','Female','Unspecified'],
    },
    SendCode:{
        type:String,
        default:null,
    },
    ChangePasswordTime:{
        type:Date,
    }
},{
    timestamps:true,
});

const UserModel = mongoose.models.User || model('User',UserSchema);
export default UserModel;