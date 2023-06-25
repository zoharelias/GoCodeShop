import './ProductsSection.css';
import { Product } from '../Product/Product.js';
import { useContext } from 'react';
import { MyContext } from '../../MyContext';

export const ProductsSection = () => {

  const {currentProducts} = useContext(MyContext);


  return (
      <section className="products">
        {currentProducts.map((p)=> <Product src={p.image} title={p.title} price={p.price} id={p._id} />)}        
      </section>
      // <div>HI</div>
    );
  };
  