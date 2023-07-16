import React, { useState, useEffect,useContext } from 'react';
import { MyContext } from '../../MyContext';

const DynamicTable = ()=> {
  const [idToDelete,setIdToDelete] = useState(0);
  const {allProducts, deleteProductById} = useContext(MyContext);

  const deleteProdById = (id)=>{
    setIdToDelete(id);
    deleteProductById(id);
  };
  return (
    <div>
        <div>ID to delete: {idToDelete}</div>
        <div></div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>DELETE</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((item, index) => (
            <tr key={index}>
              <td><button onClick={() => deleteProdById(item._id)}>Delete</button></td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DynamicTable;
