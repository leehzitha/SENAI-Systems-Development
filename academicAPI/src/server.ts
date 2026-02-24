import express from 'express';
import routes from './routes/routes.ts';

const app = express();
const port = 8080;

app.listen(port, () => console.log(`Acesse: https://localhost:${port}/`));

app.get('/', (req, res) => {
    res.status(200).send({ response: "API working"})
});

routes(app)