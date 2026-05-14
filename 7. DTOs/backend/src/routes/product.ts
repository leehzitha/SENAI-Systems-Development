import express , {Request, Response, Router } from 'express';
import ProductController from '../controllers/ProductController';
import { validateRegister, validateObejctId } from '../middlewares/personMiddleware';
const router: Router = express.Router()

router
    .post('/create', validateRegister,  ProductController.create)
    .get('/findById/:id',  ProductController.findById)
    .get('/find',  ProductController.find)
    .get('/findAll', ProductController.findAll)
    .put('/update/:id', validateObejctId, ProductController.update)
    .delete('/remove/:id', ProductController.remove)

export default router