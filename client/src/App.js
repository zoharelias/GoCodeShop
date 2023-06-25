//Now, App.js is like Home Page

import './App.css';
import CartItems from './components/CartItems/CartItems';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import { Nav } from './components/Nav/Nav';
import { ProductsSection } from './components/ProductsSection/ProductsSection';
function App() {
  return (
    <div className="App">
        <CustomDrawer>
          <CartItems />
        </CustomDrawer> 
        <Nav />
        {/* <ShoppingCart />  */}
        <ProductsSection /> 
    </div>
  );
}

export default App;
