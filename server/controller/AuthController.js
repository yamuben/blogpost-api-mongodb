import UserData from '../model/UserModel';
import { generateAuthToken } from "../helpers/token";
import bcrypt from "bcrypt";


class UserController {

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
            return res.status(409).send({ statu: 409, error: "email is duplicated" })
        }

        req.body.password= password;
        const data = await UserData.create(req.body);



        if (!data) {

            return res.status(417).json({
                status: 417,
                message: "signup failed",
            })
        }

        else {
            let { password, ...userData } = data._doc;
            return res.status(201).json({
                status: 201,
                message: "Account created succesfully",
                data: userData
            })
        }


    }

    static signin = async (req, res) => {
        let { email, password } = req.body;
        const isUserExist =await UserData.findOne({email:email});
console.log(isUserExist)
        if (isUserExist && bcrypt.compareSync(password, isUserExist._doc.password)) {

            const data = isUserExist;

            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role
            });

            let { password, ...userData } = data;
            return res.status(201).json({
                status: 201,
                message: "Account Login succesfully",
                token,
                data: userData._doc
            })
        }


        return res.status(404).json({
            status: 404,
            message: "User not found!",

        })




    }



}

export default { UserController};