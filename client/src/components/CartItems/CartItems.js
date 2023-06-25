import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import { dividerClasses } from "@mui/material";

const CartItems = ()=>{
    const {cart} = useContext(MyContext);
    console.log('cart:', cart);
    return(
        <div>
            {cart.map(p=> <div>{p.title.slice(0,10)}... total:{p.amount * p.price}</div>)}
        </div>
    )
};

export default CartItems;