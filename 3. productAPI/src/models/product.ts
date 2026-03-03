import mongoose, { Schema, Document, Date } from 'mongoose';

interface IProduct extends Document {
    name : String;
    description : String;
    price : Number;
    stock : Number;
    category : String;
    createdAt : Date;
}

const productSchema: Schema = new Schema({
    name : { type: String, required: true },
    description : { type: String, required: false},
    price : { type: Number, required: true },
    stock : { type: Number, default: 0 },
    category : { type: String, required: false},
    createdAt : { type: Date, required: true} // Date.Now() não tá funcionando
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;