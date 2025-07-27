import React from "react";
import "../../style/Checkout.css";

function Checkout({ changeFund }: { changeFund: number }) {
  return (
    <div id="checkoutComponent" className="component">
      <h2>Caisse</h2>
      <div id="checkoutPageContent"></div>
    </div>
  );
}

export default Checkout;
