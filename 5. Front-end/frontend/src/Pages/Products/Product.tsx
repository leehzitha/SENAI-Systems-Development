import axios from "axios";
import { useEffect, useState } from "react";
import './Product.css'
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import bg from './../../assets/fundo.jpg';

export default function products() {
    const [products, setProducts] = useState <any>([]);
    const id = useParams();

    const navigate = useNavigate();
    
    const fetchData = async () => {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.    data.response);
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

    const deleteProduct = async (_id: string) => {

        Swal.fire({
            title: "Delete product?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                fetchData();
            }
            else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
        })
        try {
            await axios.delete(`http://localhost:8080/api/products/${_id}`);
            setProducts(products.filter((product: any) => product.id !== _id));
            alert("Product succesfully deleted!");
        } catch (error){
        console.error("Delete error: ", error);
        }
    }

    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="
        w-screen h-screen
        gap-10
        // bg-linear-to-t
        // from-bg-primary via-bg-secondary
        // from-10% via-30% to-60% to-bg-terciary
        flex-col flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}>
            <div className="
                flex flex-col
                bg-white/2
                backdrop-blur-xl
                py-10 px-15 rounded-2xl
                ">
            <div className="
                flex flex-row justify-between
                ">
                <p className="title text-white">Products</p>
                <button
                className="bg-gray-200 p-3 rounded-xl"
                onClick={() => navigate("/AddProduct")}> Add product</button>
            </div>

                <div className="products">
                    {products.map((product: any) => (
                        <div className=" border-gray-500 border-2 rounded-xl flex w-130 justify-between p-5" key={product._id}>
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
                            className="bg-gray-200 p-3 rounded-xl h-15"
                            > Update
                        </button>

                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-500 p-3 rounded-xl h-15"
                            > Delete
                        </button>
                        </div>

                    </div>
                ))}
            </div>
            </div>
            </div>
        )}
