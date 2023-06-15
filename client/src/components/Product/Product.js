import { useContext } from 'react';
import { MyContext } from '../../MyContext';
import './Product.css'
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';

export const Product = ({ src, title, price, category }) => {
  const { shoppingCart, setShoppingCart } = useContext(MyContext);

  const removeProduct = () =>{
    const isProductAlreadyInCart = shoppingCart.find(ele => ele.title === title);
    console.log( 'isProductAlreadyInCart',isProductAlreadyInCart);
    if(isProductAlreadyInCart === undefined){ //this product is not in cart yet
      //do nothing
    } else { //we need to add amount + 1 to existing part of the array
      const filteredArr = shoppingCart.filter((value, index, arr)=>{ 
        return value.title !== title ;
      });
      if(isProductAlreadyInCart.amount === 1){
        setShoppingCart([...filteredArr]);
      } else{
        isProductAlreadyInCart.amount -= 1;
        setShoppingCart([...filteredArr,isProductAlreadyInCart]);
      }
    }
  }



  const addProduct = () =>{
    console.log('title:',title);
    console.log(price);
    console.log(src);
    //console.log('shoppingCart.amount',shoppingCart.amount);
    
    const isProductAlreadyInCart = shoppingCart.find(ele => ele.title === title);
    console.log( 'isProductAlreadyInCart',isProductAlreadyInCart);
    if(isProductAlreadyInCart === undefined){ //this product is not in cart yet
      const newProduct = {
        'amount' : 1,
        title,
        price,
        src
      }
      setShoppingCart([...shoppingCart,newProduct]);
    } else { //we need to add amount + 1 to existing part of the array
      const filteredArr = shoppingCart.filter((value, index, arr)=>{ 
        return value.title !== title ;
    });
      isProductAlreadyInCart.amount += 1;
      setShoppingCart([...filteredArr,isProductAlreadyInCart]);
    }
    
  }
    return (
      <div className="product-card">
        <div className="product-image">
          {/* <img src="https://cdn.shopify.com/s/files/1/0938/8938/products/10231100205_1_1315x1800_300_CMYK_1024x1024.jpeg?v=1445623369" /> */}
          <img src={src} title='product'/>
        </div>
        <div className="product-info">
          <h4>{title}</h4>
          <h5>{category}</h5>
          <h6>{price}</h6>
          <div className='buttonsContainer'>
          <button className='addRemoveButton' title="Add to cart" onClick={addProduct}>+</button>
          <button className='addRemoveButton' title="Remove from cart" onClick={removeProduct}>-</button>
          </div>
        </div>
      </div>
    );
  };
  