import express, { Router } from 'express';
import ProductController from '../controllers/productController.ts';

const router: Router = express.Router();

router.get('/products', ProductController.findAll);
router.get('/product/:id', ProductController.findById);
router.post('/newProduct', ProductController.create);
router.put('/products/:id', ProductController.update);

export default router;