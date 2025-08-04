import React, { useContext } from "react";
import { tabIngredient } from "./assemblyKitchenTools";
import { Ingredient } from "../../../interfaces/produitsInterfaces";
import { StocksRawsIngredientsContext } from "../../../context/StockRawsContext";
import { AvailableMeat } from "../../../interfaces/compositionElementsInterfaces";
import { handleClickSelectedTab } from "../../../functions/generalsFuctions";

function TabsCuisineComponent({
  setActiveTab,
  activeTab,
  addNewIngredientInBuildingBurger,
  availableGrill,
  availableFrying,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  addNewIngredientInBuildingBurger: (
    ingredient: Ingredient,
    ingredientQuantity: number
  ) => void;
  availableGrill: AvailableMeat[];
  availableFrying: AvailableMeat[];
}) {
  // CONTEXT
  const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);

  return (
    <div>
      <h3>Fabrication</h3>
      <div id="tabs">
        {tabIngredient.map((tab) => (
          <button
            key={tab.tabName}
            onClick={() => handleClickSelectedTab(tab.section, setActiveTab)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
      <div>
        <div
          className={
            activeTab === tabIngredient[0].section ? "tabOpen" : "tabClose"
          }
        >
          {stocksRawsIngredients[1].productionArray.map((bread) => (
            <button
              key={bread.ingredientName}
              onClick={() =>
                addNewIngredientInBuildingBurger(bread, bread.currentStocks)
              }
            >
              {bread.ingredientName} : {bread.currentStocks}
            </button>
          ))}
        </div>
        <div
          className={
            activeTab === tabIngredient[1].section ? "tabOpen" : "tabClose"
          }
        >
          {availableGrill.map((meat) => (
            <button
              key={meat.meat.ingredientName}
              onClick={() =>
                addNewIngredientInBuildingBurger(meat.meat, meat.quantity)
              }
            >
              {meat.meat.ingredientName} : {meat.quantity}
            </button>
          ))}
        </div>
        <div
          className={
            activeTab === tabIngredient[2].section ? "tabOpen" : "tabClose"
          }
        >
          {availableFrying.map((frying) => (
            <button
              key={frying.meat.ingredientName}
              onClick={() =>
                addNewIngredientInBuildingBurger(frying.meat, frying.quantity)
              }
            >
              {frying.meat.ingredientName} : {frying.quantity}
            </button>
          ))}
        </div>
        <div
          className={
            activeTab === tabIngredient[3].section ? "tabOpen" : "tabClose"
          }
        >
          {stocksRawsIngredients[3].productionArray.map((cheese) => (
            <button
              key={cheese.ingredientName}
              onClick={() =>
                addNewIngredientInBuildingBurger(cheese, cheese.currentStocks)
              }
            >
              {cheese.ingredientName} : {cheese.currentStocks}
            </button>
          ))}
        </div>
        <div
          className={
            activeTab === tabIngredient[4].section ? "tabOpen" : "tabClose"
          }
        >
          {stocksRawsIngredients[5].productionArray.map((ingredient) => (
            <button
              key={ingredient.ingredientName}
              onClick={() =>
                addNewIngredientInBuildingBurger(
                  ingredient,
                  ingredient.currentStocks
                )
              }
            >
              {ingredient.ingredientName} : {ingredient.currentStocks}
            </button>
          ))}
        </div>
        <div
          className={
            activeTab === tabIngredient[5].section ? "tabOpen" : "tabClose"
          }
        >
          {stocksRawsIngredients[2].productionArray.map((sauce) => (
            <button
              key={sauce.ingredientName}
              onClick={() =>
                addNewIngredientInBuildingBurger(sauce, sauce.currentStocks)
              }
            >
              {sauce.ingredientName} : {sauce.currentStocks}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabsCuisineComponent;
