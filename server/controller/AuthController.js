import UserData from '../model/UserModel';
import { generateAuthToken } from "../helpers/token";
import bcrypt from "bcrypt";
import EmailHelper from "../helpers/emailTemplate";
import Response from "../helpers/response";


class UserController {


    static changePassword = async (req,res)=>{

        let {
            oldPassword,
            newPassword,
            confirmPassword
        }=req.body;

        const userId = req.body.userId;

        const userDetails = await UserData.findById(userId);

        console.log(userDetails)

        if(bcrypt.compareSync(oldPassword,userDetails.password)){

            if(newPassword === confirmPassword){


                const password =  bcrypt.hashSync(newPassword, 10);
                const passwordChangedTime = Date.now()
                const userUpdated = await UserData.findByIdAndUpdate(userId,{
                    password:password,
                    passwordChangedTime:passwordChangedTime
                })


                return Response.successMessage(res,"success",userUpdated,200)
            }

            return Response.errorMessage(res, "new Password and Confirm Password not match!", 404)



          

        }

        return Response.errorMessage(res, "Old  Password provided is invalid", 417)






    }

    static signup = async (req, res) => {
      
        let {
            firstName,
            lastName,
            email,
            gender,
            password,
            role,
            department,
            address

        } = req.body;


        password = bcrypt.hashSync(password, 10)

        const isEmailExist = await UserData.findOne({email:email});

        if (isEmailExist) {
         return   Response.errorMessage(res,"email is duplicated",409)
                   }

        req.body.password= password;
        const data = await UserData.create(req.body);



        if (!data) {

            return Response.errorMessage(res,"signup failed", 417)

        }

        else {
            let { password, ...userData } = data._doc;

//             await  EmailHelper.userWelcomeEmail(req,userData);

        return    Response.successMessage(res,"Account created succesfully",userData,201)

        }


    }

    static signin = async (req, res) => {
        let { email, password } = req.body;
        const isUserExist =await UserData.findOne({email:email});
// console.log(isUserExist)
        if (isUserExist && bcrypt.compareSync(password, isUserExist._doc.password)) {

            const data = isUserExist;

            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role,
                passwordChangedTime: data.passwordChangedTime
            });

            let { password, ...userData } = data._doc;

       return     Response.successMessage(res,"login succesfully",{token},201)

        }


      return  Response.errorMessage(res,"User not exist",404)

    }



}

export default { UserController};
