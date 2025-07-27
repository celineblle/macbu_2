import React, { useState } from "react";
import Office from "./components/office/Office";
import Kitchen from "./components/kitchen/Kitchen";
import Counter from "./components/counter/Counter";
import "./style/App.css";
import { SectionRawIngredients } from "./interfaces/compositionElementsInterfaces";
import {
  fryingSection,
  breadSection,
  sauceSection,
  cheeseSection,
  meatSection,
  variousIngredientSection,
  friesSection,
  freshProductSection,
  iceCreamSection,
  drinkSection,
  bagSection,
} from "./elements/ingredients";

function App() {
  const [cashFund, setCashFund] = useState<number>(100);
  const [stocksRawsIngredients, setStocksRawsIngredients] = useState<
    SectionRawIngredients[]
  >([
    fryingSection,
    breadSection,
    sauceSection,
    cheeseSection,
    meatSection,
    variousIngredientSection,
    friesSection,
    freshProductSection,
    iceCreamSection,
    drinkSection,
    bagSection,
  ]);

  return (
    <div id="homePage">
      <Office
        cashFund={cashFund}
        setCashFund={setCashFund}
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
      />
      <Kitchen />
      <Counter cashFund={cashFund} setCashFund={setCashFund} />
    </div>
  );
}

export default App;
