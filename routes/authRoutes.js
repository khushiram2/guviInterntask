import {Router} from "express"
import {  isemailUnique, isuserRegistered } from "../middleware/authmiddleware.js"
import { loginController, privateRouteCheckController, registerController, verificationController } from "../controller/authController.js"
import { isTokenValid } from "../middleware/cookieMiddleware.js"


const router=Router()

router.get("/test",(_,res)=>  res.send("auth route working fine"))
router.post("/register",isemailUnique,registerController)
router.post("/otp/verification",verificationController)
router.post("/login",isuserRegistered, loginController)
router.get("/verify",isTokenValid,privateRouteCheckController)


export const authRouter=router