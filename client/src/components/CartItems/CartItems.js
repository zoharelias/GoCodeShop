import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import { dividerClasses } from "@mui/material";
import './CartItems.css';

const CartItems = ()=>{
    const {cart,setCart} = useContext(MyContext);
    //console.log('cart:', cart);
    const addProduct = (id)=>{
        const isProductAlreadyInCart = cart.find(ele => ele._id === id);
        const filteredArr = cart.filter((catrItem, index, arr)=>{ 
            return catrItem._id !== id;
        });
        isProductAlreadyInCart.amount += 1;
        setCart([...filteredArr,isProductAlreadyInCart]);
    }
    const removeProduct = (id)=>{
        const tempCart = [...cart];
        const itemToChangeIndex = tempCart.findIndex(item=> item._id ===id);
        console.log(itemToChangeIndex);
        if(tempCart[itemToChangeIndex].amount > 1){
             tempCart[itemToChangeIndex].amount -= 1;
        } else { //remove item from cart
            tempCart.splice(itemToChangeIndex,1);
        }
        setCart([...tempCart]);
        // const isProductAlreadyInCart = cart.find(ele => ele._id === id);
        // const filteredArr = cart.filter((catrItem, index, arr)=>{ 
        //     return catrItem._id !== id;
        // });
        // isProductAlreadyInCart.amount -= 1;
        // setCart([...filteredArr,isProductAlreadyInCart]);
    }
    return(
        <div>
            <div className="header">
                <div className="heading">Your Cart Items</div>
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