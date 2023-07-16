import './Nav.css'
import { DropDowns } from '../DropDowns/DropDown';
import { sortArrOptions, filterArrOptions } from '../../local-data/data';
import { useState,useEffect,useContext } from 'react';
import { MyContext } from '../../MyContext';
import { Badge, IconButton } from '@mui/material';
import { Mail, ShoppingCartTwoTone } from '@mui/icons-material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
//import { ShoppingCart } from '../ShoppingCart/ShoppingCart';

export const Nav = ({shopTitle}) => {
  const {categories, handleFilterProducts, setIsCartOpen, itemsCount} = useContext(MyContext);

  const sortBy = (sortByValue)=>{
    console.log(sortByValue);
    switch(sortByValue){
      case "":
        break;
    }
  }

  return (
    <nav className="product-filter">
      <h1>{shopTitle}</h1>
      <div className="sort">

        <DropDowns onChange={(event) => handleFilterProducts(event.target.value)} label = {"filter"} optionsArray={categories}/>
        {/* <DropDowns onChange={(event) => {console.log(event.target.value)}} label={"sort"} optionsArray={sortArrOptions}/> */}
        <DropDowns onChange={(event) => sortBy(event.target.value)} label={"sort"} optionsArray={sortArrOptions}/>
        
        <Badge badgeContent={itemsCount} color="primary">
          <IconButton onClick={()=>{setIsCartOpen(true)}}>
            <ShoppingCartTwoToneIcon color="primary" aria-label="shopping cart"/>
          </IconButton>
        </Badge>

      </div>
    </nav>
  );
};
