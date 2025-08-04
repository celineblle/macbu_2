import React, { useState } from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter";
import Drink from "./Drink";
import IceCream from "./IceCream";
import "../../style/Counter.css";
import { FinalProductBurger } from "../../interfaces/produitsInterfaces";
import { allIceCream } from "../../elements/produits";

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

const [availableIceCream, setAvailableIceCream] = useState([])

console.log(allIceCream.length)

  return (
    <div id="counterComponent">
      <Checkout cashFund={cashFund} />
      <AssemblyCounter cashFund={cashFund} setCashFund={setCashFund} 
              readyBurger={readyBurger}
        setReadyBurger={setReadyBurger}

      />
      <Drink />
      <IceCream />
    </div>
  );
}

export default Counter;
