import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";

interface Product {
    _id: string
    name: string
    stock: number
    price: number
}

export const GetProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/products/find")
        setProducts(response.data.users)
        console.log(response.data.users)
    }

    const updateProduct = async (_id: string) => {
        return navigate(`/update/${_id}`)
    }

    const deleteProduct = async (_id: string) => {

        Swal.fire({
            title: "Deseja realmente deletar?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    await axios.delete(`http://localhost:8080/api/products/remove/${_id}`)
                    Swal.fire("Deletado com sucesso", "", "success");
                    fetchData()
                }
                catch{
                    Swal.fire("Erro!", "", "error");
                }
            }
          });
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            
            <div className="w-full max-w-4xl">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Produtos
                    </h1>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    
                    <table className="w-full text-sm text-left text-gray-600">
                        
                        <thead className="text-xs text-gray-500 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Qtd</th>
                                <th className="px-6 py-4">Preço</th>
                                <th className="px-6 py-4">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr 
                                    key={product._id} 
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {product.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                                            {product.stock}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {product.price.toLocaleString('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        })}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        <button className="rounded-sm p-2 bg-red-600 text-white mx-4" onClick={() => deleteProduct(product._id)}>Deletar</button>
                                        <button className="rounded-sm p-2 bg-blue-600 text-white mx-4" onClick={() => updateProduct(product._id)}>Atualizar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {products.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            Nenhum produto encontrado
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-6">
                    <button 
                        onClick={() => navigate(`/create`)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
                    >
                        Novo Produto
                    </button>
                </div>

            </div>
        </div>
    )
}