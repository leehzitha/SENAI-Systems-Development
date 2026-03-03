import { Request, Response} from 'express';
import Product from '../models/product.ts';

class ProductController {
    static async getProducts (req: Request, res: Response) {
        const products = await Product.find();
        return res.status(200).send({ response: products })
    }

    static async registerProduct (req: Request, res: Response) {
        
    }
}