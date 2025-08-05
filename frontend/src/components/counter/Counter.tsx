import React, { useState } from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCreamComponent from "./IceCream";
import "../../style/Counter.css";
import { FinalProductBurger, FinalProductDessert, FinalProductDrink } from "../../interfaces/produitsInterfaces";

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
  // ICE CREAM
  const [readyIceCream, setReadyIceCream] = useState<
    FinalProductDessert[]
  >([]);

  //DRINK
  const [readyDrink, setReadyDrink] = useState<FinalProductDrink[]>([])

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
        readyDrink={readyDrink}
        setReadyDrink={setReadyDrink}
      />
      <Drink 
        readyDrink={readyDrink}
        setReadyDrink={setReadyDrink}
      />
      <IceCreamComponent
        readyIceCream={readyIceCream}
        setReadyIceCream={setReadyIceCream}
      />
    </div>
  );
}

export default Counter;
