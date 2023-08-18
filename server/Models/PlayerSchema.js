import mongoose, { mongo } from "mongoose";
const player = mongoose.Schema({
    name : {
        type:String,
        required:true
    }
    ,
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registerAt:{
        type:Date,
        required:true
    },
    profilepic:{
        type:Boolean,
        default:false
    }
})
export default mongoose.model("player",player)