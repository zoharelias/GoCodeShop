import { useContext ,useEffect,useState } from 'react';
import { MyContext } from '../../MyContext';
import Button from '../Button/Button';
import './Product.css'
import { useNavigate } from 'react-router-dom';

import { ShoppingCart } from '../ShoppingCart/ShoppingCart';


export const Product = ({ src, title, price, category, id, isInSinglePage, description }) => {
  const navigate = useNavigate();
  const {incrementProduct, decrementProduct, addToCart} = useContext(MyContext);
  const [count,setCount] = useState(0);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [buttonTitle, setButtonTitle] = useState('');
  
  useEffect(()=>{
    if(count === 0){
      setAddButtonDisabled(true);
      setButtonTitle('Choose amount to add before clicking');
    } else {
      setAddButtonDisabled(false);
      setButtonTitle('Click to add to cart');
    }
},[count]);
  
  const linkToSingleProductPage = ()=>{
    console.log(isInSinglePage);
    if(isInSinglePage) {
      return;
    } else {
      navigate(`product/${id}`);
    }
  };
  const { shoppingCart, setShoppingCart } = useContext(MyContext);
    console.log('title', title, 'isInSinglePage',isInSinglePage );
    return (
      <div className="product-card">
        <div className="product-image" onClick={()=> linkToSingleProductPage()}>
          <img src={src} title={`${title}: Click to go to product page`} alt='Click to go to product page'/>
        </div>
        <div className="product-info">
          <h4>{title}</h4>
          {isInSinglePage && <h4>{description}</h4>}
          <h5>{category}</h5>
          <h3>{price}$</h3>
          <div className='addToCartContainer'>
            <Button onClick={()=>decrementProduct(setCount)} text={'-'} />
            <p>{count}</p>
            <Button onClick={()=>incrementProduct(setCount)} text={'+'} />
          </div>
          <Button title={buttonTitle} disabled={addButtonDisabled} style={{background:"black", color:"white"}} onClick={()=> addToCart(id,count,setCount)} text={"Add to cart"} />
        </div>
      </div>
    );
  };
  