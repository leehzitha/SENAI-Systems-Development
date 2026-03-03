import express, { Request, response, Response, Router } from 'express';

interface Person {
    name: string
    lastName: string
    id: number
}

const router: Router = express.Router();
const people: Person[] = [];

router
    .post('/register', (req: Request, res: Response) => {
        const { id, name, lastName } = req.body
        console.log(id, name, lastName)
        people.push({id, name, lastName})
        res.status(200).send("Registrado com sucesso!")
    })
    .get('/users', (req: Request, res: Response) => {
        res.status(200).send({ users: people })
    })
    .get('/users/:id', (req: Request, res: Response) => {
        const {id} = req.params
        let convertedId = Number(id)
        let mano = people.find((person) => person.id == convertedId)
        res.status(200).send({person: mano})
    })
    .get('/filter', (req: Request, res: Response) => {
        const { name, lastName } = req.query
        res.status(200).send({ name: name, lastName})
    })
    .put('/update/:id', (req: Request, res: Response) => {
        const { id } = req.params
        const { name, lastName } = req.body
        res.status(200).send({ response: `Atualizando o usuário ${id} -> ${name} ${lastName}`})
    })
    .patch('updatePatch/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const { nome } = req.body;

        res.send(`Nome da pessoa com ID ${id} foi atualizado para: ${nome}`);
    })

export default router;