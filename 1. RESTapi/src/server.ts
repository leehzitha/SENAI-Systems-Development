import express from 'express'
import routes from './routes/routes.ts'

const port = 8080
const app = express()
// const pessoa = { name: "Letícia", lastName: "Burlinski" }

// app.get('/', (req, res) => {
//     res.status(200).send({ pessoa : pessoa.name})
// })

app.get('/', (req, res)=> {
    res.status(200).send({ response: "API funcionando!"})
})

routes(app)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
