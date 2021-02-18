import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { v4 } from "uuid";

function App() {
   const [products] = useState(data);
   const [cart, setCart] = useState([]);

   // read localStorage's cart on mount
   useEffect(() => {
      setCart(JSON.parse(localStorage.cart));
   }, []);

   // update localstorage on cart changes
   useEffect(() => {
      localStorage.cart = JSON.stringify(cart);
   }, [cart]);

   const addItem = (item) => {
      setCart(cart.concat({ ...item, uniqueid: v4() }));
      // assigning a uuid so that we can easily remove each item of the same book
   };

   const removeItem = (uniqueid) => {
      setCart(cart.filter((i) => i.uniqueid !== uniqueid));
   };

   return (
      <div className="App">
         <CartContext.Provider value={cart}>
            <Navigation />
         </CartContext.Provider>
         {/* Routes */}
         <Route exact path="/">
            {/* <Products products={products} addItem={addItem} /> */}
            <ProductContext.Provider value={{ products, addItem }}>
               <Products />
            </ProductContext.Provider>
         </Route>
         <Route path="/cart">
            <CartContext.Provider value={{ cart, removeItem }}>
               <ShoppingCart />
            </CartContext.Provider>
         </Route>
      </div>
   );
}

export default App;
