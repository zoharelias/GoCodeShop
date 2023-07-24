import React, { useContext,useEffect } from "react";
import { MyContext } from "../../MyContext";
import { dividerClasses } from "@mui/material";
import { Link } from 'react-router-dom';
import './CartItems.css';

const CartItems = ()=>{
    const {cart,setCart,setItemsCount} = useContext(MyContext);
    
    useEffect(() => {
        if(getNumberOfProductsInCart() === 0){
          //make shoppng cart non visible
        } else {
          //make it visible
        }
      },[cart]) 
  
    
    
    const getNumberOfProductsInCart=()=>{
        let i = 0;
        cart.forEach(element => {
            i += element.amount;
        });
        setItemsCount(i);
        return i;
    }
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
    return(
        <div>
            <div className="header">
                <div className="heading">Your Cart Items</div>
                <div><Link className="simple" to={'cart'}>Go to Cart page</Link></div>
            </div>
            <div className="cartItems">
                {cart.map(p=> <div className="item">
                                <div className="title">{p.amount}</div>
                                <div className="imageBox"><img src={p.image} width={20} height={20}></img></div>
                                <div className="title">{p.title.slice(0,30)}... total:{p.amount * p.price}</div>
                                <div className='buttonsContainer'>
                                    <button className='addRemoveButton' title="Add to cart" onClick={()=> addProduct(p._id)}>+</button>
                                    <button className='addRemoveButton' title="Remove from cart" onClick={()=> removeProduct(p._id)}>-</button>
                                </div>
                            </div>)}
            </div>
        </div>
    )
};

export default CartItems;