import React, { useContext} from "react";
import { MyContext } from "../../MyContext";

const CartPage = () => {
    const {cart} = useContext(MyContext);
    return (
        <div>
            {cart.map(cartItem => <><p>{cartItem.title}</p><p>{cartItem.price}$</p></>)}
        </div>
    )
};

export default CartPage;