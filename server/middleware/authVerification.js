import {dataFromToken} from "../helpers/token";
import userController from "../controller/AuthController";
import userInfos from '../model/UserModel'
import Response from "../helpers/response";

export const verifyAuth =async (req,res,next)=>{

    const token = req.header("x-auth-token");
    if(!token){
        return Response.errorMessage(res, " Not token provided", 404)
    }

    try{

        const user = dataFromToken(token).payload;
    
        const data = await userInfos.findById(user.id)

    console.log(data)
        if(!data){
            return Response.errorMessage(res,"Please provide true credentials", 404)
        }

        if(user.passwordChangedTime != data.passwordChangedTime){
            return Response.errorMessage(res,"Please re-Login, Password has been changed",404);
        }

    // console.log(data)
        req.body.userId =user.id;
    
        return next();
    
    
    }catch(e){


        return Response.errorMessage(res, "Invalid token", 404)

    }





}