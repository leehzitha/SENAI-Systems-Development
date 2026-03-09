import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const data = await axios.get("http://localhost:8080/api/products/find");
    setProducts(data);
  }
  return (
    <>
      
    </>
  )
}

export default App
