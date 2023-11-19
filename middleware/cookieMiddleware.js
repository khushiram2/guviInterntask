import { verifyToken } from "../utilities/tokenutils.js"



export const isTokenValid =async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        const verified= verifyToken(token)
        if(verified){
            req.userId=verified.id
            next()
        }else{
            res.status(200).send({successStatus:false,message:"invalid token"})
        }
    } catch (error) {
        console.log({where:"cokkie verification",error:error})
        res.status(500).send({successStatus:false,message:"some error occured try agian"})
    }

}