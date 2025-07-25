import React from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCream from "./IceCream";
import "../../style/Counter.css";

function Counter() {
  return (
    <div id="counterComponent">
      <Checkout />
      <AssemblyCounter />
      <Drink />
      <IceCream />
    </div>
  );
}

export default Counter;
