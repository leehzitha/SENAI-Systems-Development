import axios from "axios";
import { useEffect, useState } from "react";
import './Product.css'
import { useNavigate } from "react-router-dom";

export default function products() {
    const [products, setProducts] = useState <any>([]);

    const navigate = useNavigate();
    
    const fetchData = async () => {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data.response);
    };

    const updateProduct = async (id: string, stock: number) => {
        try {
        const newStock = stock + 1;

        await axios.put(`http://localhost:8080/api/products/${id}`, {
            stock : newStock
        })

        setProducts(products.map((product: any) => product.id === id ? { ...product, stock: newStock } : product));
        } catch (error) {
        console.error("Error while updating!", error);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        setProducts(products.filter((product: any) => product.id !== id));
        alert("Product succesfully deleted!");
        } catch (error){
        console.error("Delete error: ", error);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
            <div className="w-screen h-screen gap-10 bg-linear-to-t from-bg-primary via-bg-secondary from-10% via-30% to-60% to-bg-terciary flex-col flex justify-center items-center">
            <div className="flex flex-row justify-between bg-white">
                <p className="title">Products</p>
                <button
                className="button addProduct"
                onClick={() => navigate("/AddProduct")}> Add product</button>
            </div>

            <div className="products">
                {products.map((product: any) => (
                <div className="product" key={product._id}>
                    <div className="productData">
                    <p className="productName">{product.name}</p>
                    <p className="productPrice">R$ {product.price}</p>
                    <p className="productStock">Disponível: {product.stock}</p>
                    </div>

                    <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    gap: '10px'
                    }}>
                    <button
                        onClick={() => updateProduct(product._id, product.stock)}
                        style={{ backgroundColor: ' #bebfc4', color: 'white', cursor: 'pointer', height: '30%' }}
                    > Update
                    </button>

                    <button
                        onClick={() => deleteProduct(product._id)}
                        style={{ backgroundColor: ' #f0795b', color: 'white', cursor: 'pointer', height: '30%' }}
                    > Delete
                    </button>
                    </div>

                </div>
                ))}
            </div>
            </div>
        )}
