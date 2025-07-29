import React, { useState } from "react";
import Office from "./components/office/Office";
import Kitchen from "./components/kitchen/Kitchen";
import Counter from "./components/counter/Counter";
import "./style/App.css";
import { SectionRawIngredients } from "./interfaces/compositionElementsInterfaces";
import { allProductsArray } from "./elements/ingredients";
import { FinalProductSide } from "./interfaces/produitsInterfaces";

function App() {
  // OFFICE & GLOBAL VARIABLES
  const allProduct: SectionRawIngredients[] = allProductsArray.slice();
  const [cashFund, setCashFund] = useState<number>(100);
  const [stocksRawsIngredients, setStocksRawsIngredients] =
    useState<SectionRawIngredients[]>(allProduct);

  //FRIES VARIABLES
  const [readyPortionFries, setReadyPortionFries] = useState<
    FinalProductSide[]
  >([]);
  return (
    <div id="homePage">
      <Office
        cashFund={cashFund}
        setCashFund={setCashFund}
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
      />
      <Kitchen
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
        readyPortionFries={readyPortionFries}
        setReadyPortionFries={setReadyPortionFries}
      />
      <Counter cashFund={cashFund} setCashFund={setCashFund} />
    </div>
  );
}

export default App;
