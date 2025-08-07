import React, { useContext, useState } from "react";
import { TabsProducts } from "../../interfaces/compositionElementsInterfaces";
import { allFreshProducts } from "../../elements/produits";
import {
  FinalProductBurger,
  FinalProductSide,
  FinalProductDrink,
  FinalProductDessert,
  Ingredient,
} from "../../interfaces/produitsInterfaces";
import { NuggetBoxStock } from "../../interfaces/compositionElementsInterfaces";
import { handleClickSelectedTab } from "../../functions/generalsFuctions";
import { StocksRawsIngredientsContext } from "../../context/StockRawsContext";

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

    // CONTEXT
    const stocksRawsIngredients = useContext(StocksRawsIngredientsContext)

    const [activeTab, setActiveTab] = useState<string>("burger");

  const tabsCounterArray: TabsProducts[] = [
    {
      section: "burger",
      tabName: "Burger",
      correspondingArray: readyBurger,
    },
    {
      section: "side",
      tabName: "Accompagnement",
      correspondingArray: readyPortionFries,
    },
    {
      section: "fresh",
      tabName: "Frais",
      correspondingArray: allFreshProducts,
    },
    {
      section: "drink",
      tabName: "Boisson",
      correspondingArray: readyDrink,
    },
    {
      section: "nugget",
      tabName: "Nugget",
      correspondingArray: readyNuggetBox,
    },
    {
      section: "dessert",
      tabName: "Glace",
      correspondingArray: readyIceCream,
    },
        {
      section: "bag",
      tabName: "Sac",
      correspondingArray: stocksRawsIngredients[10].productionArray,
    },
  ];

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
