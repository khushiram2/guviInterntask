import mongoose from "mongoose";
import { stylesSchema } from "./CustomstylesSchema.js";


const noteSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId ,required:true, ref:"User"},
    title:{type:String,required:true},
    content:{type:String,required:true, default:"this is the body"  },
    styles:{type:stylesSchema,default:{
        fontColor:"#000000",
        backgroundColor:"#ffffff"
    }}
},{timestamps:true})

export const NoteModel=mongoose.model("Note",noteSchema)