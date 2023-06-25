import { useContext ,useState } from 'react';
import { MyContext } from '../../MyContext';
import Button from '../Button/Button';
import './Product.css'
import { useNavigate } from 'react-router-dom';

import { ShoppingCart } from '../ShoppingCart/ShoppingCart';


export const Product = ({ src, title, price, category, id }) => {
  const navigate = useNavigate();
  const {incrementProduct, decrementProduct, addToCart} = useContext(MyContext);
  const [count,setCount] = useState(0);

  const { shoppingCart, setShoppingCart } = useContext(MyContext);

    return (
      <div className="product-card">
        <div className="product-image" onClick={()=> navigate(`product/${id}`)}>
          <img src={src} title='product' alt='product'/>
        </div>
        <div className="product-info">
          <h4>{title}</h4>
          <h5>{category}</h5>
          <h6>{price}$</h6>
          <div className='addToCartContainer'>
            <Button onClick={()=>decrementProduct(setCount)} text={'-'} />
            <p>{count}</p>
            <Button onClick={()=>incrementProduct(setCount)} text={'+'} />
          </div>
          <Button style={{background:"black", color:"white"}} onClick={()=> addToCart(id,count,setCount)} text={"Add to cart"} />
        </div>
      </div>
    );
  };
  