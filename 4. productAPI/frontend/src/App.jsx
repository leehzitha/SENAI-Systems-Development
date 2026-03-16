import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("localhost:8080/api/products")
    setProducts(response.data);
  }

  useEffect(() => {
    fetchProducts();
  },[])

  return (
    <>
      {
        products.map((product) => {
          return (
            <div>
              <span>{product.name}</span>
              <span>{product.price}</span>
            </div>
          )
        })
      }
    </>
  )
}

export default App
