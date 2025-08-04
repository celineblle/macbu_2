import React, { useState } from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCreamComponent from "./IceCream";
import "../../style/Counter.css";
import { FinalProductBurger, FinalProductDessert } from "../../interfaces/produitsInterfaces";

function Counter({
  cashFund,
  setCashFund,
  readyBurger,
  setReadyBurger,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
}) {
  const [readyIceCream, setReadyIceCream] = useState<
    FinalProductDessert[]
  >([]);

  return (
    <div id="counterComponent">
      <Checkout cashFund={cashFund} />
      <AssemblyCounter
        cashFund={cashFund}
        setCashFund={setCashFund}
        readyBurger={readyBurger}
        setReadyBurger={setReadyBurger}
        readyIceCream={readyIceCream}
        setReadyIceCream={setReadyIceCream}
      />
      <Drink />
      <IceCreamComponent
        readyIceCream={readyIceCream}
        setReadyIceCream={setReadyIceCream}
      />
    </div>
  );
}

export default Counter;
