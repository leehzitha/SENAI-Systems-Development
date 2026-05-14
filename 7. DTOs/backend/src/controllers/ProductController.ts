import { Response, Request} from 'express'
import Product from '../models/product'
import { findDTO, registerProductDTO } from '../dtos/productDTO'
import { findAll, findById, register } from '../services/product.service'

class ProductController {
    static async create (req: Request, res: Response){
        const data : registerProductDTO  = req.body
        try {
            await register(data)
            return res.status(201).send({response: `Produto ${data.name} cadastrado`})
        }
        catch {
            return res.status(500).send({response: `Error while creating product`})
        }
    }

    static async findAll (req: Request, res: Response){
        const data : findDTO = {
            name : req.query.name as string,
            category : req.query.category as string,
            minPrice : Number(req.query.minPrice),
            maxPrice : Number(req.query.maxPrice)
        }

        try {
            const product = await findAll(data)
            return res.status(200).send({response: product})
        }
        catch {
            return res.status(404).send({response: `Product not found`})
        }
    }

    static async findById (req: Request, res: Response){
        const data : findDTO = req.params
        try{
            const product = await findById(data)
            return res.status(200).send({response: product})
        }
        catch{
            return res.status(404).send({response: `Product not found!`})
        }
    }

    static async find (req: Request, res: Response){
        const products = await Product.find()
        res.status(200).send({users : products})
    }

    static async update (req: Request, res: Response){
        const {id} = req.params
        const {name, description, price, stock, category} = req.body
        try{
            await Product.findByIdAndUpdate(id , { name, description, price, stock, category})
            const product = await Product.findById(id)
            return res.status(200).send({response: product})
        }
        catch{
            return res.status(404).send({ response: `Usuário não encontrado!`})
        }
    }
    
    static async remove (req: Request, res: Response){
        const {id} = req.params
        try{
            await Product.findByIdAndDelete(id)
            return res.status(200).send({response: `Usuário deletado`})
        }
        catch{
            return res.status(404).send({ response: `Usuário não encontrado!`})
        }
    }
}

export default ProductController