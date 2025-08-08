import React, {  useState } from "react";
import {
  FinalProductBurger,
  FinalProductSide,
  FinalProductDrink,
  FinalProductDessert,
  Ingredient,
} from "../../interfaces/produitsInterfaces";
import { NuggetBoxStock } from "../../interfaces/compositionElementsInterfaces";
import { handleClickSelectedTab } from "../../functions/generalsFuctions";
import AssemblyCounterTools from "./AssemblyCounterTools";

function TabsAssemblyCounter({
  readyBurger,
  readyPortionFries,
  readyDrink,
  readyNuggetBox,
  readyIceCream,
}: {
  readyBurger: FinalProductBurger[];
  readyPortionFries: FinalProductSide[];
  readyDrink: FinalProductDrink[];
  readyNuggetBox: [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
  readyIceCream: FinalProductDessert[];
}) {

const [activeTab, setActiveTab] = useState<string>("burger");

const {tabsCounterArray} = AssemblyCounterTools(  {readyBurger,
  readyPortionFries,
  readyDrink,
  readyNuggetBox,
  readyIceCream})

  return (
    <div>
      <div id="tabs">
        {tabsCounterArray.map((tab) => (
          <button
            key={tab.tabName}
            onClick={() => handleClickSelectedTab(tab.section, setActiveTab)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
      {tabsCounterArray.map((array) => (
        <div
          className={
            activeTab === array.section ? "tabOpen" : "tabClose"
          }
        >
          {array.correspondingArray.map(
            (
              product:
                | FinalProductBurger
                | FinalProductSide
                | FinalProductDrink
                | FinalProductDessert
                | NuggetBoxStock | Ingredient
            ) =>
              "boite" in product && "quantity" in product ? (
                <button>{product.boite.name} : {product.quantity}</button>
              ) : 
              "currentStocks" in product ? (
                <button>
                    {product.ingredientName} : {product.currentStocks}
                </button>
              ) :
              (
                <button>{product.name}</button>
              )
          )}
        </div>
      ))}
    </div>
  );
}

export default TabsAssemblyCounter;
