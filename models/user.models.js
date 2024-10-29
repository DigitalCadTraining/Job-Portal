
import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student', 'recruiter'], //for many options and to choose one
    },
    profile:{
        bio:{type:String},
        skills:{type:String},
        resume:{type:String}, //url can be added
        resumeOriginalName:{type:String}, //actual file name with extension also 
        company:{type:mongoose.Schema.Types.ObjectId, ref: 'Company'}, //we will create relationship between comapny schenma and there we will create ref id for this chsnema
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);