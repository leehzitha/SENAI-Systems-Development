import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();
const port = 8080;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.status(200).send({ response: "API working"})
});

routes(app);