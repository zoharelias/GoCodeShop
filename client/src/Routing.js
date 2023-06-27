import React ,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import { MyContext } from './MyContext';

import Table from './pages/Table/Table';
import TablePagination from './pages/Table/TablePagination';
import DataTable from './pages/DataTable/DataTable';
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
  const [productIdToDelete,setProductIdToDelete] = useState(0);
  const [productIdToEdit,setProductIdToEdit] = useState(0);

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

  //delete product
  const deleteProductById = async (id) => {
    try {
      const deletedProd = await fetch(`http://localhost:8000/api/product/${id}`, { method: 'DELETE'});
      //return `Prodeuct deleted succsfully`;
      const res = await deletedProd.json();
      console.log(`Deleted product`,deletedProd);
      console.log(`res`,res);
    } catch (error) {
      return `Pruduct was not deleted, there was an error: ${error}`;
    }
    
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
    fetchProducts();
  }, [productIdToDelete]);

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
    //console.log('cart has changed via useEffect, now it is:',cart);
  }, [cart]);

  

//reurn
  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          cart,
          currentProducts,
          allProducts,
          setAllProducts,
          categories,
          handleFilterProducts,
          incrementProduct,
          decrementProduct,
          addToCart,
          setIsCartOpen,
          isCartOpen,
          deleteProductById,
          productIdToDelete,
          setProductIdToDelete,
          productIdToEdit,
          setProductIdToEdit
        }}
      >
        <div className='navbar'>
          <Link className='routeLink' to='/'>HomePage</Link>
          <Link className='routeLink' to='about'>About</Link>
          <Link className='routeLink' to='cart'>Cart</Link>
          <Link className='routeLink' to='admin'>Admin</Link>
          <Link className='routeLink' to='dataTable'>Data Table</Link>
          <Link className='routeLink' to='table'>Table</Link>
          <Link className='routeLink' to='tablePagination'>Table Pagination</Link>
        </div>
        <Routes>
           <Route path='/' element={<App />} /> 
           <Route path='about' element={<AboutPage />} /> 
           <Route path='admin' element={<AdminPage />} /> 
           <Route path='cart' element={<CartPage />} /> 
           <Route path='about' element={<AboutPage />} /> 
           <Route path='datatable' element={<DataTable />} /> 
           <Route path='table' element={<Table />} /> 
           <Route path='tablepagination' element={<TablePagination />} /> 
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

