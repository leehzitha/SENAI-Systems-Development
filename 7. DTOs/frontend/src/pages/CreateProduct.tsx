import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const CreateProduct = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate();

    const createProduct = async () => {
        try {
            await axios.post("http://localhost:8080/api/products/create", {
                name,
                description,
                category,
                stock,
                price
            })
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Cadastro de Produto
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
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Descrição</label>
                        <input 
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Categoria</label>
                        <input 
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Estoque</label>
                        <input 
                            type="number"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setStock(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Preço</label>
                        <input 
                            type="number"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>

                </div>
                
                <button 
                    onClick={createProduct}
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 hover:scale-[1.02] transition"
                >
                    Criar Produto
                </button>

            </div>
        </div>
    )
}