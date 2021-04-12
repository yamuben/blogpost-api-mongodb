import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Email from "./email";

dotenv.config();

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: "true",
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    }
})


class EmailHelper {
    static async userWelcomeEmail(req, user) {
        // console.log("<><><><><><>><><><><><")
        // console.log("email:",EMAIL_ADDRESS)
        // console.log("password:",EMAIL_PASSWORD)
        const info = await transporter.sendMail(Email.welcomeEmail(req, user));

        // console.log(info)
    }
}


export default EmailHelper;