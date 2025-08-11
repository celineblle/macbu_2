import React, { useContext } from "react";
import "../../style/Checkout.css";
import { OrdersToPrepareContext, SetOrdersToPrepareContext } from "../../context/OrderContext";

function Checkout({ cashFund }: { cashFund: number }) {

  //ORDERS CONTEXT
  const ordersToPrepare = useContext(OrdersToPrepareContext);
  const setOrdersToPrepare = useContext(SetOrdersToPrepareContext);


  return (
    <div id="checkoutComponent" className="component">
      <h2>CAISSE</h2>
      <ul id="checkoutPageContent">
        {ordersToPrepare.map((order, i) => (
        <li className="readyOrder checkoutOrder">
          Commande {i + 1} : {order.price}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Checkout;
