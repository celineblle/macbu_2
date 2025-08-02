import React from "react";
import { bread, meat, frying, cheese, variousIngredient, sauce } from "../../elements/ingredients";
import { TabIngredientKitchen } from "../../interfaces/compositionElementsInterfaces";

  // TABS
export  const tabIngredient: TabIngredientKitchen[] = [
    {
      section: "bread",
      tabName: "Pain",
      correspondingArray: bread,
    },
    {
      section: "meat",
      tabName: "Viande",
      correspondingArray: meat,
    },
    {
      section: "meat",
      tabName: "Friture",
      correspondingArray: frying,
    },
    {
      section: "cheese",
      tabName: "Fromage",
      correspondingArray: cheese,
    },
    {
      section: "variousIngredient",
      tabName: "Ingrédient",
      correspondingArray: variousIngredient,
    },
    {
      section: "sauce",
      tabName: "Sauce",
      correspondingArray: sauce,
    },
  ];

// TOOL VARIABLE
export  const emptyBurger: string = "Vide";
