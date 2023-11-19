import nodemailer from "nodemailer"

export const sendMail=async (email,otp)=>{
    try {
        const transprter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const mailOPtions={
            from: process.env.Email,
            to:email,
            subject:"Otp for Note App",
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Notes App OTP</title>
            </head>
            <body style="font-family: 'Arial', sans-serif;">
            
                <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
                    <h2 style="color: #333;">Notes App OTP</h2>
                    <p style="color: #555;">Use the following OTP to verify your identity:</p>
                    <div style="background-color: #ffffff; padding: 10px; border-radius: 5px; font-size: 24px; color: #333; margin: 20px 0;">
                        <!-- Place the OTP dynamically -->
                        <strong>${otp}</strong>
                    </div>
                    <p style="color: #555;">This OTP is valid for the next 5 minutes.</p>
                    <p style="color: #777;">If you didn't request this OTP, please ignore this email.</p>
                </div>
            
            </body>
            </html>
            `
        }

      const mailSent= await  transprter.sendMail(mailOPtions)
      if(!mailSent){
        throw new Error("problem sending mail")
      }
    } catch (error) {
        console.log({where:"sending mail",error:error})
    }
}