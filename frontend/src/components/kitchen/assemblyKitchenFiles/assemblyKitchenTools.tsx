import React from "react";
import {
  bread,
  meat,
  frying,
  cheese,
  variousIngredient,
  sauce,
} from "../../../elements/ingredients";
import { TabsIngredients } from "../../../interfaces/compositionElementsInterfaces";
import { FinalProductBurger } from "../../../interfaces/produitsInterfaces";

// TABS
export const tabIngredient: TabsIngredients[] = [
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
export const emptyBurger: string = "Vide";
export const limitSizeBurgerTray: number = 4;
export const customBurgerTitle: string = "Recette personnelle";
export const emptyBurgerObject: FinalProductBurger = {
  name: "waitingBurger",
  ingredient: {
    bread: emptyBurger,
    meat: emptyBurger,
    cheese: [],
    variousIngredient: [],
    sauce: [],
  },
  size: 0,
  price: 0,
  type: "burger",
  bread: "type",
};
