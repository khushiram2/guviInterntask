import jwt from "jsonwebtoken"


export const generateToken = (id) => {
    try {
        return  jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"1d"})
    } catch (error) {
        console.log({where:"generating token",error:error})
    }
}


export const verifyToken = (token) => {
    try {
       const verified= jwt.verify(token,process.env.SECRET_KEY)
       return verified
    } catch (error) {
        console.log({where:"verifying token",error:error})
    }
}