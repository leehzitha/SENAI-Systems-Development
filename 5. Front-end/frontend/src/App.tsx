
import './App.css'

import Register from "./Pages/Register/Register.tsx";
import { Login } from './Pages/Login/Login.tsx';
import Product from './Pages/Products/Product.tsx';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './Pages/AddProducts/AddProduct.tsx';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
    </Routes>
  )
}


export default App
