import React from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCream from "./IceCream";
import "../../style/Counter.css";

function Counter({
  cashFund,
  setCashFund,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div id="counterComponent">
      <Checkout cashFund={cashFund} />
      <AssemblyCounter cashFund={cashFund} setCashFund={setCashFund} />
      <Drink />
      <IceCream />
    </div>
  );
}

export default Counter;
