import React from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCream from "./IceCream";

function Counter() {
  return (
    <>
      <Checkout />
      <AssemblyCounter />
      <Drink />
      <IceCream />
    </>
  );
}

export default Counter;
