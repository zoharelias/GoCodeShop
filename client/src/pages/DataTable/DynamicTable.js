import React, { useState, useEffect,useContext } from 'react';
import { MyContext } from '../../MyContext';

//function DynamicTable() {
const DynamicTable = ()=> {
  const [data, setData] = useState([]);
  const [idToDelete,setIdToDelete] = useState(0);
  const {allProducts, deleteProductById} = useContext(MyContext);

  // Simulated fetch or data update
  const fetchData = () => {
    setData(allProducts);
    console.log('allProducts:');
    console.log(allProducts);
    console.log('data:');
    console.log(data);
  };

  useEffect(()=>{
    fetchData();
  },[])

//   const addToData = ()=>{
//     setData([...data,{title: 'Item 5', price: 50, description: 'Description 5' }]);
//     console.log('data',data);
//   };

//   const editData = ()=>{
//     const newerData = [...data];
//     newerData[0].title = 'Item 10';
//     setData(newerData);
//   };

  const deleteProdById = (id)=>{
    console.log(id);
    setIdToDelete(id);
    deleteProductById(id);
    console.log('all products after delete',allProducts);
    setData(allProducts);
    console.log('data after delete',data);
  };
useEffect(()=>{setData(allProducts)},[allProducts])
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
          {data.map((item, index) => (
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
