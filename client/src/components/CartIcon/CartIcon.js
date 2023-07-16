import { Badge, IconButton } from '@mui/material';
import { Mail, ShoppingCartTwoTone } from '@mui/icons-material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { MyContext } from '../../MyContext';
import { useContext } from 'react';

export const CartIcon = () =>{
    const { setIsCartOpen, itemsCount} = useContext(MyContext);

    return(
        <Badge badgeContent={itemsCount} color="primary">
        <IconButton onClick={()=>{setIsCartOpen(true)}}>
            <ShoppingCartTwoToneIcon color="primary" aria-label="shopping cart"/>
        </IconButton>
    </Badge>

    );
};