import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    //name email password googleId
    name:{
        type:String,
        required:true
        },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        },
        googleId:{
            type:String
            }

})// createing a model of user and check if the schema is already present
 export const User=mongoose.models?.User || mongoose.model('User',userSchema)