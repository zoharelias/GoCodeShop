import './App.css';
import { MyContext } from './MyContext';
import { Nav } from './components/Nav/Nav';
import { ProductsSection } from './components/ProductsSection/ProductsSection';
import { useState,useEffect,useContext } from 'react';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';

function App() {
  const [productsA,setProductsA] = useState([]);

  const [shoppingCart,setShoppingCart] = useState([]);


  const fetchProductsA = async () => {
    //const response = await fetch('https://fakestoreapi.com/products');
    const response = await fetch('http://localhost:8000/api/');
    //const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setProductsA(data)
  }

  //when loading once
  useEffect(() => {
    fetchProductsA();
  },[]) 

//
  return (
    <MyContext.Provider value={{shoppingCart,setShoppingCart}}>
      <div className="App">
        <Nav productsA={productsA} updateProducts={setProductsA} />
        <ShoppingCart />
        <ProductsSection productsA={productsA} />
      </div>
    </MyContext.Provider>
  );
}

export default App;
