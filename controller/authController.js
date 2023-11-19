import { sendMail } from "../mail/sendMail.js"
import { OTPModel } from "../model/OtpModel.js"
import { UserModel } from "../model/userModel.js"
import { generateOTP } from "../utilities/OTPutils.js"
import { comparePassword, hashPassword } from "../utilities/passwordUtils.js"
import { generateToken } from "../utilities/tokenutils.js"



export const registerController=async(req,res)=>{
    try {
        const {userData}=req.body
        const hashedPassword=await hashPassword(userData.password)
        const createdUser=await UserModel.create({...userData,password:hashedPassword})
        if(createdUser){
            const generatedOTP=await generateOTP(createdUser._id,createdUser.email,res)
            if(generatedOTP){
                await sendMail(createdUser.email,generatedOTP,res)
                    res.status(200).send({successStatus:true,message:"user registered sucessfully please verify the user by entering otp sent your mail",userId:createdUser._id})
            }
        }else{
            res.status(200).send({successStatus:false,message:"some problem occured while registering the user"})

        }
    } catch (error) {
        console.log({where:"registeration of user",error:error})
        res.status(500).send({successStatus:false,message:"some error occured while registering the user"})
    }

}

export const verificationController=async(req,res)=>{
    try {
        const {userId,otp}=req.body
const OtpFromDb=await OTPModel.findOne({userId:userId})
if(OtpFromDb){
    const match=await comparePassword(otp,OtpFromDb.hashedOTP)
    if(match){
       const updated =  await UserModel.updateOne({_id:userId},{$set:{verificationStatus:true}})
       if(!updated) res.status(200).send({successStatus:false,message:"couldn't update user"})
        const token = await generateToken(userId)
        // res.cookie("token",token,{httpOnly:true})
        res.status(200).send({successStatus:true,message:"user verified sucessfully",token:token})
    }else{
        res.status(200).send({successStatus:false,message:"otp doen't match"})
    }
}else{
    res.status(200).send({successStatus:false,message:"no otp for said user"})
}
    } catch (error) {
        console.log({where:"verification of user",error:error})
        res.status(500).send({successStatus:false,message:"some error occured while verifying the user"})
  }
}



export const loginController = async (req,res) => {
    try {
        const {password}=req.body
    const  userData =  req.userDataFromdb
    const match=await comparePassword(password,userData.password)
    if(match){
        const token = await generateToken(userData._id)
        // res.cookie("token",token,{httpOnly:true})
        res.status(200).send({successStatus:true,message:"user logged in sucessfully",userId:userData._id,token:token})
    }else{
        res.status(200).send({successStatus:false,message:"some error occured while loginging  in the user"})
    }
    } catch (error) {
        console.log({where:"user login controller",error:error})
        res.status(500).send({successStatus:false,message:"some error occured while loginging  in the user"})
    }
}

export const privateRouteCheckController = async (req,res) => {
    try {
        const userId=req.userId
        const userExist=await UserModel.findOne({_id:userId})
        if(userExist){
            res.status(200).send({successStatus:true,message:"user is valid"})
        }else{
            res.status(200).send({successStatus:false,message:"invalid user id"})
        }

    } catch (error) {
        console.log({where:"privateRoute check",error:error})
        res.status(500).send({successStatus:false,message:"error occured while checking private routes"})
    }
}
