import React, { useState } from "react";
import Checkout from "./Checkout";
import AssemblyCounter from "./AssemblyCounter/AssemblyCounter";
import Drink from "./Drink";
import IceCreamComponent from "./IceCream";
import "../../style/Counter.css";
import { FinalProductBurger, FinalProductDessert, FinalProductDrink,  FinalProductSide } from "../../interfaces/produitsInterfaces";
import { NuggetBoxStock } from "../../interfaces/compositionElementsInterfaces";

function Counter({
  cashFund,
  setCashFund,
  readyBurger,
  setReadyBurger,
  readyPortionFries,
  setReadyPortionFries,
  readyNuggetBox,
  setReadyNuggetBox,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
 readyPortionFries: FinalProductSide[];
  setReadyPortionFries: React.Dispatch<
    React.SetStateAction<FinalProductSide[]>
  >;
  readyNuggetBox: [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
  setReadyNuggetBox: React.Dispatch<
    React.SetStateAction<[NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]>
  >;
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
        readyPortionFries={readyPortionFries}
        setReadyPortionFries={setReadyPortionFries}
        readyNuggetBox={readyNuggetBox}
        setReadyNuggetBox={setReadyNuggetBox}
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
