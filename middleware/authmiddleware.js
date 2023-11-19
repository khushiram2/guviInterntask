import { sendMail } from "../mail/sendMail.js"
import { UserModel } from "../model/userModel.js"
import { generateOTP } from "../utilities/OTPutils.js"

//note learn a way to escape these nested if else conditions does't look good

export const isemailUnique = async (req,res,next) => {
    try {
        const {userData}=req.body
        const user= await UserModel.findOne({email:userData.email})
        if(user){
            if(user.verificationStatus===false){
                const generatedOTP=await generateOTP(user._id,user.email,res)
                if(generatedOTP){
                    await sendMail(user.email,generatedOTP)
                        res.status(200).send({successStatus:true,message:"complete the verification by entering otp sent your mail",userId:user._id})
                }
            }else{
                res.status(200).send({successStatus:false,message:"email already in use please try another email",userId:user._id})
            }
        }else{
            next()
        }
    } catch (error) {
        console.log({where:"middleware email existence check",error:error})
        res.status(500).send({successStatus:false,message:"some error occured while registering"})
    }
}


export const isuserRegistered = async (req,res,next) => {
    try {
        const {email}=req.body
        const user= await UserModel.findOne({email:email})
        if(user){
            if(!user.verificationStatus){
                const generatedOTP=await generateOTP(user._id,user.email,res)
                if(generatedOTP){
                    await sendMail(user.email,generatedOTP,res)
                        res.status(200).send({successStatus:true,message:"complete the verification by entering otp sent your mail",userId:user._id})
                }
            }else{
                req.userDataFromdb=user
                next()
            }
        }else{
            res.status(200).send({successStatus:false,message:"not a valid user"})
        }
    } catch (error) {
        console.log({where:"middleware user existence check",error:error})
        res.status(500).send({successStatus:false,message:"some error occured while getting registered user"})
    }
}


