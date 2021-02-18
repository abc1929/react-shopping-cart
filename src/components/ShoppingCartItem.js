import React from "react";
import CartContext from "../contexts/CartContext";

const Item = (props) => {
   return (
      <CartContext.Consumer>
         {({ removeItem }) => {
            return (
               <div className="shopping-cart_item">
                  <img src={props.image} alt={`${props.title} book`} />

                  <div>
                     <h1>{props.title}</h1>
                     <p>$ {props.price}</p>
                     <button
                        onClick={() => {
                           removeItem(props.uniqueid);
                        }}
                     >
                        Remove from cart
                     </button>
                  </div>
               </div>
            );
         }}
      </CartContext.Consumer>
   );
};

export default Item;
