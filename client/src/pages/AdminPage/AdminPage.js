import React, { useState, useContext, useEffect } from "react";
import CustomPaginationActionsTable from './../Table/TablePagination'
import { MyContext } from "../../MyContext";
import './AdminPage.css';
const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [productForm, SetProductForm] = useState({}); //form object

    const { productIdToDelete, setProductIdToDelete} = useContext(MyContext);
    const { productIdToEdit, setProductIdToEdit, deleteProductById,editProductById} = useContext(MyContext);
    const setAdminOnOff = () => {
        setIsAdmin(!isAdmin);
      };
    
      const confirmDelete = (id)=> {
        deleteProductById(id);
        setProductIdToDelete(0);        
    };
    
    const saveEdit = (id)=> {
        editProductById(id,productForm);
        setProductIdToEdit(0);        
    };
    
    const handleFormChange = (name, value) => {
        SetProductForm({...productForm, [name]:value});
        //console.log(productForm);
   }
   

    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={()=> setAdminOnOff()}>Set Admin</button>
            {
                isAdmin &&
            <>
                <h2>ADMIN</h2>
                
                <CustomPaginationActionsTable />
                <h3>ID to delete:{productIdToDelete}</h3>
                <h3>ID to edit:{productIdToEdit}</h3>
                {(productIdToDelete !==0) && <button onClick={()=> confirmDelete(productIdToDelete)}>Confirm Delete</button>}
                {
                    (productIdToEdit !==0) && 
                    <div className="addEditForm">
                        <input name="title" placeholder="title" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <input name="desctription" placeholder="desctription" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <input name="category" placeholder="category" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}}  />
                        <input name="price" placeholder="price" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <input name="image" placeholder="image" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <button onClick={()=> saveEdit(productIdToEdit)}>Save Changes</button>
                    </div>
                
                }


            </>
            }


        </div>
    )
};

export default AdminPage;