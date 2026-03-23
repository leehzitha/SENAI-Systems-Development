import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CryptoJS from 'crypto-js';
import user from "../models/user.ts";

dotenv.config();

class AuthController {
static async register(req: Request, res: Response): Promise<any> {
    const { name, email, password } = req.body;

    const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET as string).toString();
   
    const User = new user({
        name,
        email,
        password: passwordCrypt,
    });

    try {
        await User.save();
        return res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Something failed" });
    }
}

static async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const User = await user.findOne({ email: email})
    
    if (User){
        const decryptPassword = CryptoJS.AES.decrypt(User.password, process.env.SECRET as string);
        const passwordDecrypted = decryptPassword.toString(CryptoJS.enc.Utf8);

        if(password !== passwordDecrypted) {
            return res.status(400).send({ response: "Invalid user or password!"})
        }
    }
    else {
        return res.status(404).send("User not found!");   
    }

    const secret = process.env.SECRET
    const token = jwt.sign(
        {
            id: User.id
        },
        secret as string,
        {
            expiresIn: '2 days'
        }
    )

    return res.status(200).send({ token });
}
}

export default AuthController;