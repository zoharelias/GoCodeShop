import React, { useState, useContext, useEffect } from "react";
import CustomPaginationActionsTable from './../Table/TablePagination'
import { MyContext } from "../../MyContext";
const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { productIdToDelete, setProductIdToDelete} = useContext(MyContext);
    const { productIdToEdit, setProductIdToEdit, deleteProductById} = useContext(MyContext);
    const setAdminOnOff = () => {
        setIsAdmin(!isAdmin);
      };
    
    const confirmDelete = (id)=> {
        deleteProductById(id);
        setProductIdToDelete(0);        
    };
    
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
                <button onClick={()=> confirmDelete(productIdToDelete)}>Confirm Delete</button>
            </>
            }


        </div>
    )
};

export default AdminPage;