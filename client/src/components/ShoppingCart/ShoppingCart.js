import { useContext,useEffect } from 'react';
import './ShoppingCart.css'
import { MyContext } from '../../MyContext';
import { Product } from '../Product/Product';

export const ShoppingCart = () => {
    const {shoppingCart} = useContext(MyContext);
    const myContext = useContext(MyContext);

    const getNumberOfProductsInCart=()=>{
        let i = 0;
        shoppingCart.forEach(element => {
            i += element.amount;
        });
        return i;
    }

    const getTotalPrice=()=>{
        let i = 0;
        shoppingCart.forEach(element => {
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
    },[shoppingCart]) 
  

    return (
      <div className="shoppingCart">
        <div>
          <h2 className='shoppingCartHeader'>Your Shopping Cart</h2>
          <p className='cartTotal'>
            <h2>You have {getNumberOfProductsInCart()} products in your cart, 
            total price: <span className='totalPrice'>{getTotalPrice()}</span></h2></p>
            <p className='itemContainer'>
            <div className='sm-table head-tbl'>amount</div>
            <div className='sm-table head-tbl'>price per unit</div>
            <div className='sm-table head-tbl'>total price</div>
            <div className='sm-table head-tbl'>Image</div>
            <div className='head-tbl'>item</div>
            </p>
            {shoppingCart.map((product)=><p className='itemContainer'>
                    <div className='sm-table'>{product.amount}</div>
                    <div className='sm-table'>{product.price}</div>
                    <div className='sm-table'>{(product.price * product.amount).toFixed(2)}</div>
                    <div className='sm-table'><img className='img-tbl' src={product.src}></img></div>
                    <div>{product.title}</div>
                    </p>)}
        </div>
      </div>
    );
  };
  