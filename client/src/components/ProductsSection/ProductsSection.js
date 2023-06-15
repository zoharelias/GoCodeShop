import './ProductsSection.css';
import { Product } from "../Product/Product";
import { useState, useEffect } from 'react';

export const ProductsSection = ({productsA}) => {

  //useState
  const [products,setProducts] = useState(productsA);


  useEffect(() => {
    console.log('welcome to the world new compony')
    console.log('products came -' ,productsA);
  },[]) 

  return (
      <section className="products">
        {productsA.map((product)=><Product src={product.image} title={product.title} price={product.price} category={product.category}/>)}
      </section>
    );
  };
  