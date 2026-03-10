import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const [products, setProducts] = useState <any>([]);

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
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      backgroundColor: 'white',
      padding: '100px'
    }}>

      <p style={{ fontFamily: 'monospace', fontSize: '30px', color: 'gray', fontWeight: 'bolder'}}>Products</p>
      {products.map((product: any) => (
          <div key={product._id} style={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '20px',
            alignItems: 'center',
            gap: '100px',
            borderRadius: '20px',
            border: '2px solid  #bebfc4'
            }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',    
              gap: '3px'
            }}>
              <p style={{ margin: '0px', color: 'gray', fontWeight: 'bolder', fontFamily: 'monospace', fontSize: '18px'}}>{product.name}</p>
              <p style={{ margin: '0px', color: 'gray', fontWeight: 'bolder', fontFamily: 'monospace', fontSize: '16px'}}>R$ {product.price}</p>
              <p style={{ margin: '0px', color: 'gray',  fontFamily: 'monospace', fontSize: '13px'}}>Disponível: {product.stock}</p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
              gap: '10px'
            }}>
              <button
                onClick={() => updateProduct(product._id, product.stock)}
                style={{ backgroundColor: ' #bebfc4', color: 'white', cursor: 'pointer', height: '30%'}}
              > Update 
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                style={{ backgroundColor: ' #f0795b', color: 'white', cursor: 'pointer', height: '30%'}}
              > Delete
              </button>
            </div>
            
          </div>
      ))}
      <button
        style={{ backgroundColor: '#bebfc4', color: 'white', height: '60px'}}
      > Add new product</button>

    </div>

  )
}


export default App
