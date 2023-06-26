import React ,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import { MyContext } from './MyContext';

import AboutPage from './pages/AboutPage/AboutPage'
import AdminPage from './pages/AdminPage/AdminPage';
import CartPage from './pages/CartPage/CartPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';

import Contact from './components/Contact/Contact';

const Routing = () => {
//add code here
//useState
const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);


  const incrementProduct = (setFunc) => {
    setFunc((prev) => prev + 1);
  };

  const decrementProduct = (setFunc) => {
    setFunc((prev) => (prev === 0 ? prev : prev - 1));
  };

  //Add to cart
  const addToCart = (id, amount, setFunc) => {
    console.log('addToCart: id-',id,'amount-',amount);
    console.log('addToCart: setFunc=',setFunc);
    if (amount === 0) {
      return;
    }
    const foundProduct = currentProducts.find((p) => p._id === id);
    const isProductExistInCart = cart.find((p) => p._id === foundProduct.id);
    console.log('addToCart: isProductExistInCart-',isProductExistInCart);
    
    if (isProductExistInCart) { //if the product already in cart
      const productInCartIndex = cart.findIndex((p) => p.id === foundProduct.id);
      const cartCopy = [...cart];
      cartCopy[productInCartIndex].amount += amount;
      setCart(cartCopy);
    } else {
      const productToCart = { ...foundProduct };
      productToCart.amount = amount;
      setCart([...cart, productToCart]);
    }
    setFunc(0); //set the count to 0
  };

  //get data from DB/server
  const fetchProducts = async () => {
    //const response = await fetch('https://fakestoreapi.com/products');
    const response = await fetch('http://localhost:8000/api/');
    const data = await response.json();
    setAllProducts(data);
    setCurrentProducts(data);
  };

  
  const handleFilterProducts = (category) => {
    if (category !== "All") {
      const filteredProducts = allProducts.filter(
        (p) => p.category === category
      );
      setCurrentProducts(filteredProducts);
    } else {
      if (currentProducts.length === allProducts.length) {
        return;
      } else {
        setCurrentProducts(allProducts);
      }
    }
  };


  //useEffects
  //when page is loading
  //the action: get the products from DB
  useEffect(() => {
    console.log('useEffect []');
    fetchProducts();
  }, []);

  //in changes
  //when allProducts change - update the list of categories dynamically
  useEffect(() => {
    setCategories(
      allProducts
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index)
    );
  }, [allProducts]);

  
  useEffect(() => {
    console.log('cart has changed via useEffect, now it is:',cart);
  }, [cart]);



//reurn
  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          cart,
          currentProducts,
          categories,
          handleFilterProducts,
          incrementProduct,
          decrementProduct,
          addToCart,
          setIsCartOpen,
          isCartOpen
        }}
      >
        <div className='navbar'>
          <Link className='routeLink' to='/'>HomePage</Link>
          <Link className='routeLink' to='about'>About</Link>
          <Link className='routeLink' to='cart'>Cart</Link>
          <Link className='routeLink' to='admin'>Admin</Link>
        </div>
        <Routes>
           <Route path='/' element={<App />} /> 
           <Route path='about' element={<AboutPage />} /> 
           <Route path='admin' element={<AdminPage />} /> 
           <Route path='cart' element={<CartPage />} /> 
           <Route path='about' element={<AboutPage />} /> 
           <Route path='product/:id' element={<SingleProductPage />} /> 
           {/* <Route path='/' element={<App />} /> 
           <Route path='/' element={<App />} /> 
          <Route path='/' element={<App />} />  */}
        </Routes>
          </MyContext.Provider>
    </BrowserRouter>
  )
}

export default Routing;

