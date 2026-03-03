import { Request, Response, NextFunction } from 'express';
import User from '../models/user.ts';

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email } = req.body
    if (!name || !email || !id){
        return res.status(400).send({ response: "ID, name and email are required!"})
    }

    let checkEmail = await User.findOne({ email });
    let checkID = await User.findOne({ id });
    
    if (checkEmail) {
        res.status(400).send("Email already in use!");
        return;
    }

    if (checkID) {
        res.status(400).send("ID already in use!");
        return;
    }
    next();
}