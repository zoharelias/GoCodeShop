import { Product } from "../models/Product.js";

//for get all
export const getAllProducts = ()=>{
    return Product.find({});
}

//for get single product by Id
export const getProductById = (id) => {
    return Product.findOne({_id:id});
}

//for get product(s) by category
export const getProductByCategory = (category) => {
    return Product.find({category});
}

//POST

//single product
export const addSingleProduct = async (newProduct) => {
    const product = new Product(newProduct);
    await product.save();
    return product;
}

//multiple products
export const addMultipleProducts = (products) => {
    return Product.insertMany(products);
}


//for delete
export const deleteProduct = (id) => {
    return Product.findOneAndDelete({_id:id});
}




