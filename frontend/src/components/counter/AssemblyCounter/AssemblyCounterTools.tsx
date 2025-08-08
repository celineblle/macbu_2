import React, {useContext} from "react";
import { StocksRawsIngredientsContext } from "../../../context/StockRawsContext";
import { TabsProducts } from "../../../interfaces/compositionElementsInterfaces";
import { NuggetBoxStock } from "../../../interfaces/compositionElementsInterfaces";
import { FinalProductDessert, FinalProductDrink, FinalProductBurger, FinalProductSide } from "../../../interfaces/produitsInterfaces";

function AssemblyCounterTools({
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

const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);

// TABS ARRAY
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
      correspondingArray: stocksRawsIngredients[7].productionArray,
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
   
    return {
tabsCounterArray
    }
}

export default AssemblyCounterTools;