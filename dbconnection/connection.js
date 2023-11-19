import mongoose from "mongoose";


export const dbConnection= async ()=>{
try {
    const connect= await mongoose.connect(process.env.DBURL)
console.log("db connected via mongoose")
    return connect
} catch (error) {
    console.log(error)
}
} 