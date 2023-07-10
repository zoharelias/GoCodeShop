import React ,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import { MyContext } from './MyContext';

import Table from './pages/Table/Table';
import TablePagination from './pages/Table/TablePagination';
import DataTable from './pages/DataTable/DataTable';
import DynamicTable from './pages/DataTable/DynamicTable';
import AboutPage from './pages/AboutPage/AboutPage'
import AdminPage from './pages/AdminPage/AdminPage';
import CartPage from './pages/CartPage/CartPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';

import Contact from './components/Contact/Contact';

const Routing = () => {
//add code here
//useState
const [categories, setCategories] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productIdToDelete,setProductIdToDelete] = useState(0);
  const [productIdToEdit,setProductIdToEdit] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  const incrementProduct = (setFunc) => {
    setFunc((prev) => prev + 1);
  };

  const decrementProduct = (setFunc) => {
    setFunc((prev) => (prev === 0 ? prev : prev - 1));
  };

  //Add to cart
  const addToCart = (id, amount, setFunc) => {
    console.log('addToCart: id:',id,'amount:',amount);
    console.log('addToCart: setFunc=',setFunc);
    if (amount === 0) {
      return;
    }
    const foundProduct = currentProducts.find((p) => p._id === id);
    console.log('foundProduct:',foundProduct);
    const isProductExistInCart = cart.find((p) =>{
       return p._id === foundProduct._id;
    });
    console.log('isProductExistInCart:',isProductExistInCart);
    if (isProductExistInCart) { //if the product already in cart
      const productInCartIndex = cart.findIndex((p) => p._id === foundProduct._id);
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


  //returnProductSelectedById

  //get single product
  const getSingleProductById = async (id)=>{
    try{
      const product = {};
      const res = await fetch(`http://localhost:8000/api/product/${id}`);
      const singleProduct = await res.json();
      console.log('res',res);
      console.log('singleProduct',singleProduct);
      //return res;
      //return singleProduct.description;
      return singleProduct;
    } catch(error){
      return error;
    }
  };
  //delete product
  const deleteProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/product/${id}`, { method: 'DELETE'});
      //return `Prodeuct deleted succsfully`;
      const deletedProd = await res.json();
      const deletedProdId = deletedProd._id;
      //console.log(`Deleted product`,deletedProd);
      //console.log(`res`,res);
      const newProducts = removeProductById(allProducts,deletedProdId);
      console.log('newProducts',newProducts);
      setAllProducts(newProducts);
      console.log('allProducts',allProducts);
    } catch (error) {
      return `Pruduct was not deleted, there was an error: ${error}`;
    }
    
  };

  //edit - PUT
  const editProductById = async (id, formObject) =>{
    try{
      console.log('formObject',formObject);
      const bodyJson = JSON.stringify(formObject);
      console.log('bodyJson',bodyJson);
      const req = {
          method: 'PUT',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formObject)
        };
        const address = `http://localhost:8000/api/product/${id}`;
        console.log(address);
        const res = await fetch(address,req);
        const updatedProduct = await res.json();
        console.log('res',res);
        console.log('updatedProduct',updatedProduct);

        //update allProducts and setAllproducts


        return updatedProduct;

    } catch(error) {
      return error;
    }
  };
  

  const removeProductById = (arr, id)=> {
  const objWithIdIndex = arr.findIndex((obj) => obj._id === id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
};


//Add - POST
const addProduct = async (formObject)=>{
  try{
    console.log('formObject',formObject);
    const bodyJson = JSON.stringify(formObject);
    console.log('bodyJson',bodyJson);
    const req = {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObject)
      };
    const address = `http://localhost:8000/api`;
    console.log(address);
    const res = await fetch(address,req);
    const updatedProduct = await res.json();
    console.log('updatedProduct',updatedProduct);
    //update allProducts
    const newAllProducts = [...allProducts,updatedProduct];
    console.log('newAllProducts',newAllProducts);
    setAllProducts(newAllProducts);
    console.log('allProducts',allProducts);
    return updatedProduct;
  } catch(error) {
    return error;
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
  }, []);
  //}, [productIdToDelete]);

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
          setCart,
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
          editProductById,
          addProduct,
          productIdToDelete,
          setProductIdToDelete,
          productIdToEdit,
          setProductIdToEdit,
          getSingleProductById
        }}
      >
        <div className='navbar'>
          <Link className='routeLink' to='/'>HomePage</Link>
          <Link className='routeLink' to='about'>About</Link>
          <Link className='routeLink' to='cart'>Cart</Link>
          <Link className='routeLink' to='admin'>Admin</Link>
          <Link className='routeLink' to='dataTable'>Data Table</Link>
          <Link className='routeLink' to='dynamicTable'>Dynamic Table</Link>
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
           <Route path='dynamictable' element={<DynamicTable />} /> 
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

