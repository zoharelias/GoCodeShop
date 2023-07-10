import React, { useState, useContext, useEffect } from "react";
import CustomPaginationActionsTable from './../Table/TablePagination'
import { MyContext } from "../../MyContext";
import './AdminPage.css';
const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedProductToEdit, setSelectedProductToEdit] = useState({});  
    const { productIdToDelete, setProductIdToDelete} = useContext(MyContext);
    const { addProduct, productIdToEdit
        , setProductIdToEdit, 
        deleteProductById,
        editProductById,
        allProducts
    } = useContext(MyContext);

    useEffect(()=>{
        if(productIdToEdit === 0 || productIdToEdit === -1){ //POST -DELETE
            setSelectedProductToEdit({});
        } else {
            const callGetSingleProductById = allProducts.find(({_id}) => _id === productIdToEdit);
            setSelectedProductToEdit(callGetSingleProductById);
        }
    }, [productIdToEdit]);
    
    useEffect(()=>{
        getPaginationPage();
    }, [allProducts]);

    const setAdminOnOff = () => {
        setIsAdmin(!isAdmin);
    };
    
    const confirmDelete = (id)=> {
        deleteProductById(id);
        setProductIdToDelete(0);        
    };
    
    const saveEdit = (id)=> {
        if(id === -1){ //add product
            const fieldsToAdd = (({ title, description,category,price,image }) => ({ title, description,category,price,image }))(selectedProductToEdit);
            addProduct(fieldsToAdd);
        } else { //edit
            const fieldsToEdit = (({ description,category,price,image }) => ({ description,category,price,image }))(selectedProductToEdit);
            editProductById(id,fieldsToEdit);
        }
        setProductIdToEdit(0);        
    };
    
    const handleFormChange = (name, value) => {
        setSelectedProductToEdit({...selectedProductToEdit, [name]:value});
    }     
   
   const beginAddProduct = ()=>{
    setProductIdToEdit(-1);   
   } 

   const getPaginationPage = () =>{
        return(
            <CustomPaginationActionsTable />
        )
   };
    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={()=> setAdminOnOff()}>Set Admin</button>
            {
                isAdmin &&
            <>
                <h2>ADMIN</h2>
                {/* <CustomPaginationActionsTable /> */}
                {getPaginationPage()}
                <h3>ID to delete:{productIdToDelete}</h3>
                <h3>ID to edit:{productIdToEdit}</h3>
                <h3><button onClick={()=> beginAddProduct()}>Add Product</button></h3>
                {(productIdToDelete !==0) && <button onClick={()=> confirmDelete(productIdToDelete)}>Confirm Delete</button>}
                {
                    (productIdToEdit !==0) && 
                    <div className="addEditForm">
                        {(productIdToEdit === -1) && <input name="title" placeholder="title" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />}
                        <input name="description" value={selectedProductToEdit.description} placeholder="desctription" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <input name="category" value={selectedProductToEdit.category} placeholder="category" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}}  />
                        <input name="price" value={selectedProductToEdit.price} placeholder="price" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <input name="image" value={selectedProductToEdit.image} placeholder="image" onChange={(event)=>{handleFormChange(event.target.name,event.target.value);}} />
                        <button onClick={()=> saveEdit(productIdToEdit)}>Save Changes</button>

                        <div>
                            <ol>
                                {allProducts.map(prod=><li>{`${prod.category}-${prod.title.substring(0,9)}-${prod.description.substring(0,19)}-${prod.price}$`}</li>)}
                            </ol>
                        </div>

                    </div>
                    
                }


            </>
            }


        </div>
    )
};

export default AdminPage;