import { use, useState } from 'react'
import './AddProduct.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import bg from './../../assets/fundo.jpg';
export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDesc] = useState("");
    const [category, setCat] = useState("");
    
    const handleNewProduct = async () => {
        try {
            await axios.post('http://localhost:8080/api/newProduct', { name, description, price, stock, category });
            Swal.fire({
                   title: "Good job!",
                   text: "User registered!",
                   icon: "success"
                 })
        } catch (error: any) {
            console.log(error.response?.data);

            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Error while creating user",
                icon: "error"
            });
}
    }
    return (
        <>
            <div className="w-screen h-screen gap-10 bg-linear-to-t from-bg-primary via-bg-secondary from-10% via-30% to-60% to-bg-terciary flex-col flex justify-center items-center"
            style={{ backgroundImage: `url(${bg})` }}>
                <p className='font-sans font-bold text-5xl text-white'>NEW PRODUCT</p>
                <div className="bg-white/3 backdrop-blur-xl p-10 rounded-2xl flex flex-col gap-8">
                    <input type="text"
                        placeholder='Product Name'
                        className=' p-2 text-gray-200 border-0 border-b focus:border-bg-primary focus:outline-none transition w-100' 
                        onChange={(e) => setName(e.target.value)}/>

                    <input type="text"
                        placeholder='Description'
                        className=' p-2 border-0 text-gray-200 border-b focus:border-bg-primary focus:outline-none transition w-100' 
                        onChange={(e) => setDesc(e.target.value)}/>

                    <input type="text"
                        placeholder='Category'
                        className=' p-2 border-0 border-b text-gray-200 focus:border-bg-primary focus:outline-none transition w-100' 
                        onChange={(e) => setCat(e.target.value)}/>

                    <input 
                        type="text"
                        placeholder='Price'
                        className='border-0 p-2 border-b text-gray-200 focus:border-bg-primary focus:outline-none transition w-100'
                        onChange={(e) => setPrice(e.target.value)}/>
                    <input type="text"
                        placeholder='Stock'
                        className='border-0 p-2 border-b text-gray-200 focus:border-bg-primary focus:outline-none transition w-100'
                        onChange={(e) => setStock(e.target.value)}/>
                    <button
                        className='p-2 bg-gray-200 rounded-xl'
                        onClick={handleNewProduct}>Submit</button>
                </div>
            </div>
        </>
    )
}