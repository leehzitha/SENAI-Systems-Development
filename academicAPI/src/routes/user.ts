import express, { Request, response, Response, Router } from 'express';
import routes from './routes.ts';
import Userr from '../models/user.ts';


interface User {
    id: number
    name: string
    email: string
    type: "student" | "teacher" | "coordenator"
    active: boolean
    createdAt: Date
}

const router: Router = express.Router();
const users : User[] = []; 

router
    .post('/usuarios', async (req: Request, res: Response) => {
        const { id, name, email, role } = req.body; // All users start as active (true)

        // data validation
        if (!email || !name || !id) {
            res.status(400).send("Name, email and ID are required.");
            return;
        }

        // let checkEmail = verifyEmail(email, res);
        // let checkID = users.find((user) => user.id == id)

        // if (!checkEmail) return;

        // if (checkID) {
        //     res.status(400).send("ID already in use!");
        //     return;
        // }

        try {
            const user = new Userr({
                id : Number(id), 
                name,
                email,
                role,
                active: true,
                createdAt: new Date()
            });
    
            await user.save();
            res.status(201).send({response: `${role} ${name} cadastrado com sucesso!`})
        
        } catch (error) {
            res.status(400).json({ message: 'Error while creating person.', error});
        }
    })

    .get('/usuarios', (req: Request, res: Response) => {
        const {type} = req.query;
        let result = [];

        if (type) {
            result = users.filter(user => user.type === type);
        }
        else {
            result = users;
        }
        res.status(200).send({ response: result });
    })

    .get('/usuarios/:id', (req: Request, res: Response) => {
        const {id} = req.params;

        const result = findUserById(id as string, res)

        if (!result) return;
    
        res.status(200).send({ response : result })
        return;
    })

    .put('/usuarios/:id', (req: Request, res: Response) => {
        const { name, email, active, type, createdAt} = req.body;
        const { id } = req.params;

        let result = findUserById(id as string, res)

        if (!result) return;

        const pos = users.indexOf(result);
        result = {id: Number(id), name, email, active, type, createdAt}
        users.splice(pos, 1, result)

        res.status(200).send(`User: ${name} successfully updated!`)
    })

    .patch('/usuarios/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const update = req.body;

        const user = findUserById(id as string, res)

        if (!user) return;

        if (update.id) {
            res.status(400).send("You can't change ID using PATCH");
            return;
        }
        Object.assign(user, req.body)
        
        res.status(200).send(`User ${update.name} updated successfully!`)

    })

    .delete('/usuarios/:id', (req: Request, res: Response) => {
        const { id } = req.params;

        const user = findUserById(id as string, res);

        if (!user) return;

        const idx = users.indexOf(user);

        users.splice(idx, 1);
        
        res.status(200).send(`User id ${id} deleted`);
    })


function findUserById(id: string, res: Response): User | null {
    const find = users.find(user => user.id === Number(id));
    if (find) {
        return find;
    }
    res.status(404).send("User not found!");
    return null;
}

function verifyEmail(email: string, res: Response): User | null {
    const find = users.find(user => user.email == email);

    if (find) {
        res.status(400).send("Email already in use!");
        return find;
    }

    return null;
}
export default router;