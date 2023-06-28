import React, { useContext, useEffect} from "react";
import { MyContext } from "../../MyContext";

import './CartPage.css';
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";

const CartPage = () => {
    const {cart} = useContext(MyContext);
    //console.log({cart});

        //Page title
        useEffect(()=>{
            document.title = `Shopping Cart, ${cart?.length} items`;
        },[cart]);
    
    return (
        <div>
            <div>Shopping Cart</div>
            <div className="cartItem">
                {cart.map(cartItem => 
                    <div className="cartLine">
                        <p className="cartItem">{cartItem.amount}</p>
                        <p className="cartItem">{cartItem.title}</p>
                        <p className="cartItem">{cartItem.price}$</p>
                    </div>)}
            </div>
            <ShoppingCart />
        </div>
    )
};

export default CartPage;