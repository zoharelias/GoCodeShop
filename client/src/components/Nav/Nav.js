import './Nav.css'
import { DropDowns } from '../DropDowns/DropDown';
import { sortArrOptions, filterArrOptions } from '../../local-data/data';
import { useState,useEffect,useContext } from 'react';
import { MyContext } from '../../MyContext';
import { IconButton } from '@mui/material';
import { ShoppingCartTwoTone } from '@mui/icons-material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
//import { ShoppingCart } from '../ShoppingCart/ShoppingCart';

export const Nav = () => {
  const {categories, handleFilterProducts, setIsCartOpen} = useContext(MyContext);

  return (
    <nav className="product-filter">
      <h1>GoCode Shop</h1>
      <div className="sort">
        {/* <DropDowns 
          caption={'Filter'} 
          optionsArray={categories}
          onChange={(event) => {
            console.log(event.target.value);
            //filterByCategory(event.target.value);
          }}  
        />
        <DropDowns 
          caption={'Sort'} 
          optionsArray={sortArrOptions}
          onChange={(event) => {console.log(event.target.value)}}  
        /> */}

        <DropDowns onChange={(event) => handleFilterProducts(event.target.value)} label = {"filter"} optionsArray={categories}/>
        <DropDowns onChange={(event) => {console.log(event.target.value)}} label={"sort"} optionsArray={sortArrOptions}/>
        <IconButton onClick={()=>{setIsCartOpen(true)}}>
          {/* <ShoppingCartTwoTone color='primary' aria-label='SHOP'></ShoppingCartTwoTone> */}
          <ShoppingCartTwoToneIcon color="primary" aria-label="shopping cart"/>
        </IconButton>
      </div>
    </nav>
  );
};
