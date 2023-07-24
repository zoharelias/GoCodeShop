import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";
import './SingleProductPage.css';
import { GET_PRODUCT_BY_ID } from './../../constants/api';

const SingleProductPage = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    const fetchProduct = async ()=>{
        //const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        //const response = await fetch(`http://localhost:8000/api/product/${id}`);
        const response = await fetch(`${GET_PRODUCT_BY_ID}/${id}`);
        const data = await response.json();
        setProduct(data);
    }

    //Page title
    useEffect(()=>{
        document.title = product?.title;
    },[product]);

    useEffect(()=>{
        fetchProduct();
        //document.title = product.title;
    },[id]);

    return (
        <div className="singleProductContainer">
           {product && (
            <Product
                src={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                id={product._id}
                isInSinglePage={true}
            />
           )} 
        </div>
    );
};

export default SingleProductPage;