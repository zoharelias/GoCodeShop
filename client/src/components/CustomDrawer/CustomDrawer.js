import { Drawer } from "@mui/material";
import React, {useContext} from 'react';
import { MyContext } from "../../MyContext";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CustomDrawer = ({children})=>{
    const {isCartOpen, setIsCartOpen} = useContext(MyContext);
    //console.log('children',children);
    return (
        <>
            <Drawer 
            anchor="left"
            elevation={70}
            open={isCartOpen}
            PaperProps={{
                sx: { width: "30%" },
              }}
            onClose={() => {setIsCartOpen(false)}}
            >
                {children}
                {/* {children.map((p)=> <div>p.image</div>)} title={p.title} price={p.price} id={p._id} isInSinglePage={false} description={p.description}/>)}         */}
                {/* {currentProducts.map((p)=> <Product src={p.image} title={p.title} price={p.price} id={p._id} isInSinglePage={false} description={p.description}/>)}         */}
            </Drawer>
        </>
    )
};

export default CustomDrawer;