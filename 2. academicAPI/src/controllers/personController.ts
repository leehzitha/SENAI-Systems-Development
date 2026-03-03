import { Request, Response} from 'express';
import User from '../models/user.ts'

class UserController {
    static async getUsers(req: Request, res: Response){
        const users = await User.find()
        return res.status(200).send({ response: users})
    }

    static async registerUser(req: Request, res: Response){
        const { id, name, email, role } = req.body; 
        
        try {
            const user = new User({
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
    }

    static async getUserByID (req: Request, res: Response) {
        const {id} = req.params;

        const result = User.findById(Number(id));

        if (!result) return;
    
        res.status(200).send({ response : result })
        return;
    }

    static async updateUser (req: Request, res: Response) {
        const { name, email, active, type, createdAt} = req.body;
        const { id } = req.params;

        try {
            const user = await User.findByIdAndUpdate(id, {
                name,
                email, 
                active, 
                type, 
                createdAt
            }, { new: true });

            if (!user) {
                res.status(404).json({ message: 'Pessoa não encontrada' });
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
        }

        // let result = findUserById(id as string, res)

        // if (!result) return;

        // const pos = users.indexOf(result);
        // result = {id: Number(id), name, email, active, type, createdAt}
        // users.splice(pos, 1, result)

        // res.status(200).send(`User: ${name} successfully updated!`)
    }

    // static async updateUserPatch (req: Request, res: Response) {
    //     const { id } = req.params;
    //     const update = req.body;

    //     const user = User.findById(Number(id));

    //     if (!user) return;

    //     if (update.id) {
    //         res.status(400).send("You can't change ID using PATCH");
    //         return;
    //     }
    //     Object.assign(user, req.body)
        
    //     res.status(200).send(`User ${update.name} updated successfully!`)
    // }

    static async deleteUser (req: Request, res: Response) {
        const { id } = req.params;

        // const user = findUserById(id as string, res);

        // if (!user) return;

        // const idx = users.indexOf(user);

        // users.splice(idx, 1);

        const user = await User.findByIdAndDelete(Number(id));

        if (user) {
            res.status(200).send(`User id ${id} deleted`);
            return;
        }

        res.status(400).send('User not found');
        
        
    }

}


// function findUserById(id: string, res: Response): User | null {
//     const find = users.find(user => user.id === Number(id));
//     if (find) {
//         return find;
//     }
//     res.status(404).send("User not found!");
//     return null;
// }

// function verifyEmail(email: string, res: Response): User | null {
//     const find = users.find(user => user.email == email);

//     if (find) {
//         res.status(400).send("Email already in use!");
//         return find;
//     }

//     return null;
// }
export default UserController;