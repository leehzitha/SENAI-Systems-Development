import { findDTO, registerProductDTO } from "../dtos/productDTO";
import Product from "../models/product";

export async function register(data: registerProductDTO) {
    const {name, description, price, stock, category } = data
    const createdAt = new Date()
    const product = new Product({name, description, price, stock, category})
    await product.save()
    
}

export async function findAll(data : findDTO) {
    const {name, category, minPrice, maxPrice} = data
    const convertedMinPrice = Number(minPrice)
    const convertedMaxPrice = Number(maxPrice)
    const product = await Product.find({
        name: name,
        category: category,
        price: { $gte: convertedMinPrice, $lte: convertedMaxPrice },
        stock: { $gt: 0}
    })
    return product
}

export async function findById(data: findDTO) {
    const id = data.id
    const product = await Product.findById(id)

}