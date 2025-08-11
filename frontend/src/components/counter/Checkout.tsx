import React from "react";
import "../../style/Checkout.css";

function Checkout({ cashFund }: { cashFund: number }) {
  return (
    <div id="checkoutComponent" className="component">
      <h2>CAISSE</h2>
      <div id="checkoutPageContent"></div>
    </div>
  );
}

export default Checkout;
