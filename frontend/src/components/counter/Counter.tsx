import React from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCream from "./IceCream";
import "../../style/Counter.css";

function Counter({
  changeFund,
  setChangeFund,
}: {
  changeFund: number;
  setChangeFund: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div id="counterComponent">
      <Checkout changeFund={changeFund} />
      <AssemblyCounter changeFund={changeFund} setChangeFund={setChangeFund} />
      <Drink />
      <IceCream />
    </div>
  );
}

export default Counter;
