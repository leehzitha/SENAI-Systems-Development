import { Request, response, Response} from 'express';
import Product from '../models/product.ts';
import mongoose from "mongoose";

class ProductController {
    static async findAll (req: Request, res: Response) {
        try {
            const { name, category, minPrice, maxPrice, inStock} = req.query;

            const filters : any = {};

            if (name) filters.name = { $regex: name, $options: "i"};
            if (category) filters.category = category;

            if (minPrice || maxPrice) {
                filters.price = {};
                if (minPrice) filters.price.$qte = Number(minPrice);
                if (maxPrice) filters.price.$lte = Number(maxPrice);
            }
        
            if (inStock === "true") filters.stock = { $gt: 0 };
            
            const products = await Product.find(filters).select('-__v');
            return res.status(200).send({ response: products })
        
        } catch (error) {
            return res.status(500).send("Error finding products");
        }
    }

    static async findById ( req: Request, res: Response) {
        const { id } = req.params;

        const product = await Product.findById(id);
        
        if(!product) res.status(400).send("Product not found!").select('-__v');
        
        res.status(200).send({ response: product});
    }

    static async create (req: Request, res: Response) {
        const { name, description, price, stock, category } = req.body;

        
        try {
            const product = new Product({
                name,
                description,
                price: price,
                stock: stock, 
                category
            });

            await product.save();
            return res.status(200).send("Product added!");

        } catch(error : any) {
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    message: "Required yields missing!",
                    errors: error.errors
                });
            }

            return res.status(500).send("Error while adding product!");
        }
    }

    static async update (req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;

        const isValid = mongoose.Types.ObjectId.isValid(String(id));
        
        if (!isValid) res.status(404).send("Product ID not found!");

        try {
            const product = await Product.findByIdAndUpdate(
                id,
                {
                    name, 
                    description,
                    price, 
                    stock,
                    category
                },
                { new: true }
            );

            return res.status(200).send({ response: product });

        } catch (error) {
            return res.status(500).send("Error updating product");
        }

    }
   
}

export default ProductController;