import React, { useState } from "react";
import Office from "./components/office/Office";
import Kitchen from "./components/kitchen/Kitchen";
import Counter from "./components/counter/Counter";
import "./style/App.css";
import {
  NuggetBoxStock,
  SectionRawIngredients,
} from "./interfaces/compositionElementsInterfaces";
import { allProductsArray } from "./elements/ingredients";
import {
  FinalProductBurger,
  FinalProductSide,
} from "./interfaces/produitsInterfaces";
import { allNuggets } from "./elements/produits";
import { StocksRawsIngredientsContext, SetStocksRawsIngredientsContext } from "./context/StockRawsContext";

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

  // NUGGET VARIABLES

  const [readyNuggetBox, setReadyNuggetBox] = useState<
    [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]
  >([
    {
      boite: allNuggets[0],
      quantity: 0,
    },
    {
      boite: allNuggets[1],
      quantity: 0,
    },
    {
      boite: allNuggets[2],
      quantity: 0,
    },
  ]);

  // KITCHEN ASSEMBLY VARIABLES

  const [readyBurger, setReadyBurger] = useState<FinalProductBurger[]>([]);

  return (
    <div id="homePage">
      <SetStocksRawsIngredientsContext value={setStocksRawsIngredients}>
        <StocksRawsIngredientsContext value={stocksRawsIngredients}>

        
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
        readyNuggetBox={readyNuggetBox}
        setReadyNuggetBox={setReadyNuggetBox}
        readyBurger={readyBurger}
        setReadyBurger={setReadyBurger}
      />
      <Counter
        cashFund={cashFund}
        setCashFund={setCashFund}
        readyBurger={readyBurger}
        setReadyBurger={setReadyBurger}
      />
      </StocksRawsIngredientsContext>
      </SetStocksRawsIngredientsContext>
    </div>
  );
}

export default App;
