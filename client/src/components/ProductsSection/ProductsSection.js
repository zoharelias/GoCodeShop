import './ProductsSection.css';
import { Product } from '../Product/Product.js';
import { useContext, useEffect } from 'react';
import { MyContext } from '../../MyContext';

export const ProductsSection = ({shopTitle}) => {

  const {currentProducts} = useContext(MyContext);
    //Page title
    useEffect(()=>{
      document.title = shopTitle;
  },[]);

  return (
      <section className="products">
        {currentProducts.map((p)=> <Product src={p.image} title={p.title} price={p.price} id={p._id} isInSinglePage={false} description={p.description}/>)}        
      </section>
      // <div>HI</div>
    );
  };
  