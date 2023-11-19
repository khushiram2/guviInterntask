import mongoose from "mongoose";

export const stylesSchema= new mongoose.Schema({
    fontColor:{type:String,default:"black"},
    backgroundColor:{type:String,default:"white"}
})
