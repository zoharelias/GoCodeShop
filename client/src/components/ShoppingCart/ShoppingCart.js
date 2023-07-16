import { useContext,useEffect } from 'react';
import './ShoppingCart.css'
import { MyContext } from '../../MyContext';
import { Product } from '../Product/Product';
//import {getNumOfProductsInCart } from './Utils';

export const ShoppingCart = () => {
    const {cart,setCart,setItemsCount} = useContext(MyContext);
    const myContext = useContext(MyContext);

    const getNumberOfProductsInCart=()=>{
        let i = 0;
        cart.forEach(element => {
            i += element.amount;
        });
        setItemsCount(i);
        return i;
    }

    const getTotalPrice=()=>{
        let i = 0;
        cart.forEach(element => {
            i += element.price * element.amount;
        });
        return i.toFixed(2);
    }

    useEffect(() => {
      if(getNumberOfProductsInCart === 0){
        //make shoppng cart non visible
      } else {
        //make it visible
      }
    },[cart]) 
  
    const addProduct = (id)=>{
      const tempCart = [...cart];
      const itemToChangeIndex = tempCart.findIndex(item=> item._id ===id);
      tempCart[itemToChangeIndex].amount += 1;
      setCart([...tempCart]);
  }
  const removeProduct = (id)=>{
      const tempCart = [...cart];
      const itemToChangeIndex = tempCart.findIndex(item=> item._id ===id);
      if(tempCart[itemToChangeIndex].amount > 1){
           tempCart[itemToChangeIndex].amount -= 1;
      } else { //remove item from cart
          tempCart.splice(itemToChangeIndex,1);
      }
      setCart([...tempCart]);
  }


    return (
      <div className="shoppingCart">
        <div>
          <h2 className='shoppingCartHeader'>Your Shopping Cart</h2>
          <p className='cartTotal'>
            <h2>You have {getNumberOfProductsInCart()} products in your cart, 
            total price: <span className='totalPrice'>{getTotalPrice()}</span></h2></p>
            <p className='itemContainer'>
            <div className='sm-table head-tbl'></div>
            <div className='sm-table head-tbl'>Amount</div>
            <div className='sm-table head-tbl'>Price per unit</div>
            <div className='sm-table head-tbl'>Total price</div>
            <div className='sm-table head-tbl'>Image</div>
            <div className='head-tbl'>item</div>
            </p>
            {cart.map((product)=><p className='itemContainer'>
                    <div className='sm-table'>
                      <button className='addRemoveButton' title="Add to cart" onClick={()=> addProduct(product._id)}>+</button>
                      <button className='addRemoveButton' title="Remove from cart" onClick={()=> removeProduct(product._id)}>-</button>
                    </div>
                    <div className='sm-table'>{product.amount}</div>
                    <div className='sm-table'>{product.price}</div>
                    <div className='sm-table'>{(product.price * product.amount).toFixed(2)}</div>
                    <div className='sm-table'><img className='img-tbl' src={product.image}></img></div>
                    <div>{product.title}</div>
                    </p>)}
        </div>
      </div>
    );
  };
  