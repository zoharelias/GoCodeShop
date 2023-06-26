//Now, App.js is like Home Page

import './App.css';
import CartItems from './components/CartItems/CartItems';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import { Nav } from './components/Nav/Nav';
import { ProductsSection } from './components/ProductsSection/ProductsSection';
function App() {
  const shopTitle = "Zohar's GoCode Shop";
  return (
    <div className="App">
        <CustomDrawer>
          <CartItems />
        </CustomDrawer> 
        <Nav shopTitle={shopTitle}/>
        {/* <ShoppingCart />  */}
        <ProductsSection shopTitle={shopTitle}/> 
    </div>
  );
}

export default App;
