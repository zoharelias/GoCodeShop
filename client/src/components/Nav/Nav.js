import './Nav.css'
import { DropDowns } from '../DropDowns/DropDown';
import { sortArrOptions, filterArrOptions } from '../../local-data/data';
import { useState,useEffect,useContext } from 'react';
import { MyContext } from '../../MyContext';
import { Badge, IconButton } from '@mui/material';
import { Mail, ShoppingCartTwoTone } from '@mui/icons-material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
//import { ShoppingCart } from '../ShoppingCart/ShoppingCart';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export const Nav = ({shopTitle}) => {
  const {categories, handleFilterProducts, setIsCartOpen, itemsCount} = useContext(MyContext);

  const sortBy = (sortByValue)=>{
    console.log(sortByValue);
    switch(sortByValue){
      case "":
        break;
    }
  }


  //range
  function valuetext(value) {
    return `${value}`;
  }
  const [value, setValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('value',value);
  };

  


  return (
    <nav className="product-filter">
      <div className="sort">

        <div className='shopTitle'>{shopTitle}</div>
        <DropDowns onChange={(event) => handleFilterProducts(event.target.value)} label = {"filter"} optionsArray={categories}/>
        {/* <DropDowns onChange={(event) => {console.log(event.target.value)}} label={"sort"} optionsArray={sortArrOptions}/> */}
        <DropDowns onChange={(event) => sortBy(event.target.value)} label={"sort"} optionsArray={sortArrOptions}/>
        
        <Box width={200}>
          Price range:
          <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            min={0}
            max={100}
            step={10}
            getAriaValueText={valuetext}
            marks ={true}
            
          />
        </Box>

        <Badge className='cartIcon' badgeContent={itemsCount} color="primary">
          <IconButton onClick={()=>{setIsCartOpen(true)}}>
            <ShoppingCartTwoToneIcon color="primary" aria-label="shopping cart"/>
          </IconButton>
        </Badge>
      </div>
    </nav>
  );
};
