import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GetProducts } from './pages/GetProducts'
import { CreateProduct } from './pages/CreateProduct'
import { UpdateProduct } from './pages/UpdateProduct'

function App() {

  return (
    <>
      <BrowserRouter >
      <Routes >
        <Route path='/' element={<GetProducts/>}></Route>
        <Route path='/create' element={<CreateProduct/>}></Route>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import './App.css'

// function App() {

//   const [products, setProducts] = useState<any[]>([])
//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [category, setCategory] = useState("")
//   const [stock, setStock] = useState(0)
//   const [price, setPrice] = useState(0)
//   const [update, setUpdate] = useState(false)

//   const fetchData = async () => {
//     const response = await axios.get("http://localhost:8080/api/products/find")
//     console.log(response.data)
//     setProducts(response.data.users)
//   }

//   const createProduct = async () => {
//     try {
//       await axios.post("http://localhost:8080/api/products/create", {
//         name,
//         description,
//         category,
//         stock,
//         price
//       })

//       fetchData()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const deleteProduct = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/products/remove/${id}`)

//       fetchData()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const updateProduct = async (id: string) => {

//     try {
//       await axios.put(`http://localhost:8080/api/products/update/${id}`, {
//         name,
//         description,
//         category,
//         stock,
//         price
//       })

//       fetchData()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   return (
//     <>
//       <div className='container-inputs'>
//         <div className='container-input'>
//           <p>Nome: </p>
//           <input className='input' onChange={(e) => setName(e.target.value)}></input>
//         </div>
        
//         <div className='container-input'>
//           <p>Descrição: </p>
//           <input className='input' onChange={(e) => setDescription(e.target.value)}></input>
//         </div>
        
//         <div className='container-input'>
//           <p>Categoria</p>
//           <input className='input' onChange={(e) => setCategory(e.target.value)}></input>
//         </div>
        
//         <div className='container-input'>
//           <p>Estoque</p>
//           <input className='input' type='number' onChange={(e) => setStock(Number(e.target.value))}></input>
//         </div>
        
//         <div className='container-input'>
//           <p>Preço</p>
//           <input className='input' type='number' onChange={(e) => setPrice(Number(e.target.value))}></input>
//         </div>
//       </div>

      
//       <button onClick={createProduct}>Criar Produto</button>

//       <div className='container-card'>
//         {products.map((product: any) => (
//           <div key={product.id}>
//             <div className='card'>
//               <p>Produto: {product.name}</p>
//               <p>Descrição: {product.description}</p>
//               <p>Categoria: {product.category}</p>
//               <p>Quantidade em Estoque: {product.stock}</p>
//               <p>Preço: R${product.price}</p>
//               <button className='delete-button' onClick={() => deleteProduct(product._id)}>Deletar</button>
//               <button className='update-button' onClick={() => updateProduct(product._id)}>Editar</button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//     </>
//   )
// }

// export default App