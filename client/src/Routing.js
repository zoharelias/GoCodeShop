import React ,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import { MyContext } from './MyContext';
import { getNumOfProductsInCart } from './Utils';

import Table from './pages/Table/Table';
import TablePagination from './pages/Table/TablePagination';
import DataTable from './pages/DataTable/DataTable';
import DynamicTable from './pages/DataTable/DynamicTable';
import AboutPage from './pages/AboutPage/AboutPage'
import AdminPage from './pages/AdminPage/AdminPage';
import CartPage from './pages/CartPage/CartPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';

import { CartIcon } from './components/CartIcon/CartIcon';
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
  const [itemsCount, setItemsCount] = useState(0);
  const incrementProduct = (setFunc) => {
    setFunc((prev) => prev + 1);
  };

  const decrementProduct = (setFunc) => {
    setFunc((prev) => (prev === 0 ? prev : prev - 1));
  };

    const getNumberOfProductsInCart=()=>{
    let i = 0;
    cart.forEach(element => {
        i += element.amount;
    });
    setItemsCount(()=>{return i;});
    console.log('i',i);
    return i;
}


  //Add to cart
  const addToCart = (id, amount, setFunc) => {
    if (amount === 0) {
      return;
    }
    const foundProduct = currentProducts.find((p) => p._id === id);
    const isProductExistInCart = cart.find((p) =>{
       return p._id === foundProduct._id;
    });
    if (isProductExistInCart) { //if the product already in cart
      const productInCartIndex = cart.findIndex((p) => p._id === foundProduct._id);
      const cartCopy = [...cart];
      cartCopy[productInCartIndex].amount += amount;
      setCart(()=>{return cartCopy;});
    } else {
      const productToCart = { ...foundProduct };
      productToCart.amount = amount;
      setCart(()=>{return [...cart, productToCart];});
    }
    let currentItemsCount = getNumOfProductsInCart(cart);
    console.log('currentItemsCount',currentItemsCount);
    setItemsCount(()=>{return currentItemsCount;});
    console.log('items count:',itemsCount);
    setFunc(()=>{return 0;}); //set the count to 0
  };

  //get data from DB/server
  const fetchProducts = async () => {
    //const response = await fetch('https://fakestoreapi.com/products');
    const response = await fetch('http://localhost:8000/api/');
    const data = await response.json();
    setAllProducts(()=>{return data;});
    setCurrentProducts(()=>{return data;});
  };


  //returnProductSelectedById

  //get single product
  const getSingleProductById = async (id)=>{
    try{
      const product = {};
      const res = await fetch(`http://localhost:8000/api/product/${id}`);
      const singleProduct = await res.json();
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
      const newProducts = removeProductById(allProducts,deletedProdId);
      console.log('newProducts updated',newProducts);
      setAllProducts(()=>{return newProducts;});
      console.log('allProducts updated from newProducts',allProducts);
    } catch (error) {
      return `Pruduct was not deleted, there was an error: ${error}`;
    }
    
  };

  //edit - PUT
  const editProductById = async (id, formObject) =>{
    try{
      const bodyJson = JSON.stringify(formObject);
      const req = {
          method: 'PUT',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formObject)
        };
        const address = `http://localhost:8000/api/product/${id}`;
        const res = await fetch(address,req);
        const updatedProduct = await res.json();

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
    const bodyJson = JSON.stringify(formObject);
    const req = {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObject)
      };
    const address = `http://localhost:8000/api`;
    const res = await fetch(address,req);
    const updatedProduct = await res.json();
    const newAllProducts = [...allProducts,updatedProduct];
    setAllProducts(()=>{return newAllProducts;});
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
      setCurrentProducts(()=>{return filteredProducts;});
    } else {
      if (currentProducts.length === allProducts.length) {
        return;
      } else {
        setCurrentProducts(()=>{return allProducts;});
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
    setCategories(()=>{
      return( 
      allProducts
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index)
      )
    });
  }, [allProducts]);

  
  useEffect(() => {
    //console.log('cart has changed via useEffect, now it is:',cart);
    getNumberOfProductsInCart();
  }, [cart]);

  

//reurn
  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          itemsCount,
          setItemsCount,
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
        <nav>
            <div className='toolbar'>
              <Link className='button-30' to='/'>HomePage</Link>
              <Link className='button-30' to='cart'>Cart</Link>
              <Link className='button-30' to='about'>About</Link>
              <Link className='button-30' to='admin'>Admin</Link>
            </div>
            {/* <Link className='button-17' to='dataTable'>Data Table</Link> */}
            {/* <Link className='button-17' to='dynamicTable'>Dynamic Table</Link> */}
            {/* <Link className='button-17' to='table'>Table</Link> */}
            {/* <Link className='button-17' to='tablePagination'>Table Pagination</Link> */}
            
            {/* <Link className='routeLink' to='/'>HomePage</Link>
            <Link className='routeLink' to='about'>About</Link>
            <Link className='routeLink' to='cart'>Cart</Link>
            <Link className='routeLink' to='admin'>Admin</Link>
            <Link className='routeLink' to='dataTable'>Data Table</Link>
            <Link className='routeLink' to='dynamicTable'>Dynamic Table</Link>
            <Link className='routeLink' to='table'>Table</Link>
            <Link className='routeLink' to='tablePagination'>Table Pagination</Link> */}
            {/* <CartIcon /> */}
        </nav>
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

