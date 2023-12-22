

import nodemailer from "nodemailer"

export const sendRemainderMail=async (email,taskTitle,userName)=>{
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
            subject:"<IMP> Remailder mail for incomplete task",
            html:`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
            
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
            
                h2 {
                  color: #333333;
                }
            
                p {
                  color: #555555;
                }
              </style>
            </head>
            
            <body>
              <div class="container">
                <h2>Hi ${userName},</h2>
                <p>Your task "${taskTitle}" is pending. If you have completed it, please update it on the app.</p>
                <p>Thank you!</p>
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


