import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  addMultipleProducts,
  addSingleProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
} from "./services/Product.js";
import {
    addMultipleProductsController,
    addSingleProductController,
    deleteProductController,
    getAllProductsController,
    getProductByCategoryController,
    getProductByIdController,
    updateProductController,
} from "./controllers/Product.js";
import path from "path";

dotenv.config();

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('client/build'));
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build')); 
//   //app.use('*', express.static('client/build')); // Added this     
// }
app.get("/api/", getAllProductsController);
app.get("/api/product/:id", getProductByIdController);
//GET products by category
app.get("/api/product/:category", getProductByCategoryController);
//POST
//single product
app.post("/api/", addSingleProductController);
// multiple products (Add bulk from JSON)
app.post("/api/json/", addMultipleProductsController);

//PUT
app.put("/api/product/:id", updateProductController);

//DELETE
app.delete("/api/product/:id/", deleteProductController);

//--------

//var path = require('path');

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get("*", (req,res) => {
  res.sendFile(__dirname+"/client/build/index.html")
})


//Connect to DB
async function main() {
  //MongoDB Compass -local
  //await mongoose.connect("mongodb://127.0.0.1:27017/gocode-shop");

  //MongoDB Atlas
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  );
}

main().catch((err) => console.log(err));

//LISTEN
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
