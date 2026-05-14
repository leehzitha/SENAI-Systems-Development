import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';

export const UpdateProduct = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate();
    const { id } = useParams()

    const getProductData = async () => {
        const response = await axios.get(`http://localhost:8080/api/products/findById/${id}`)
        console.log(response.data.response)
        setName(response.data.response.name)
        setCategory(response.data.response.category)
        setPrice(response.data.response.price)
        setStock(response.data.response.stock)
        setDescription(response.data.response.description)
    }

    useEffect(() => {
        getProductData()
        console.log(id)
    },[])

    

    const update = async () => {
            Swal.fire({
                title: "Confirmar atualização?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try{
                        await axios.put(`http://localhost:8080/api/products/update/${id}`, {
                            name,
                            description,
                            category,
                            stock,
                            price
                        })
                        Swal.fire("Atualizado com sucesso", "", "success");
                        navigate("/")
                    }
                    catch{
                        Swal.fire("Erro!", "", "error");
                    }
                }
              });
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Atualizar Produto
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Preencha os dados abaixo
                    </p>
                </div>

                <div className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm text-gray-600">Nome</label>
                        <input 
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Descrição</label>
                        <input 
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Categoria</label>
                        <input 
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Estoque</label>
                        <input 
                            type="number"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setStock(Number(e.target.value))}
                            value={stock}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Preço</label>
                        <input 
                            type="number"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            value={price}
                        />
                    </div>

                </div>
                
                <button 
                    onClick={update}
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 hover:scale-[1.02] transition"
                >
                    Atualizar Produto
                </button>

            </div>
        </div>
    )
}