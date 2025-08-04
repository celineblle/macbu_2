import React from "react";
import {
  Burger,
  FinalProductBurger,
} from "../../../interfaces/produitsInterfaces";
import { allBurgers } from "../../../elements/produits";
import { emptyBurgerObject, customBurgerTitle } from "./assemblyKitchenTools";

function GetReadyBurger({
  buildingBurger,
  setBuildingBurger,
  readyBurger,
  setReadyBurger,
}: {
  buildingBurger: FinalProductBurger;
  setBuildingBurger: React.Dispatch<React.SetStateAction<FinalProductBurger>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
}) {
  // CHANGE INGREDRIENTS BURGER FORMAT TO ARRAY
  function transformObjectToArray(burger: Burger): string[] {
    const burgerArray = [burger.bread, burger.meat];

    function addIngredientIfItSNotUndefinc(prop: string[] | undefined) {
      if (prop !== undefined) {
        prop.forEach((ingrProp) => burgerArray.push(ingrProp));
      }
    }
    addIngredientIfItSNotUndefinc(burger.cheese);
    addIngredientIfItSNotUndefinc(burger.sauce);
    addIngredientIfItSNotUndefinc(burger.variousIngredient);

    return burgerArray;
  }

  //CHECK IF UNIQUE RECIPE MATCH TO BUILDING BURGER RECIPE
  function checkRecipeSimilarity(
    originalRecipe: string[],
    currentRecipe: string[]
  ): boolean {
    if (currentRecipe === undefined || currentRecipe.length === 0) {
      return false;
    }
    if (currentRecipe.length !== originalRecipe.length) {
      return false;
    }

    let i = 0;
    while (i < currentRecipe.length) {
      const ingredient = currentRecipe[i];
      if (
        originalRecipe.find((evaluated) => ingredient === evaluated) !==
        undefined
      ) {
        i++;
      } else {
        return false;
      }
    }
    return true;
  }

  // FIND THE GOOD RECIPE MATCH IN ALL RECIPE
  function findRecipeMatch(
    evaluatedBurger: FinalProductBurger
  ): FinalProductBurger | undefined {
    const currentBurger = transformObjectToArray(evaluatedBurger.ingredient);
    for (let i = 0; i < allBurgers.length; i++) {
      const burgerRecipe = transformObjectToArray(allBurgers[i].ingredient);
      const recipeConformity = checkRecipeSimilarity(
        burgerRecipe,
        currentBurger
      );
      if (recipeConformity === true) {
        return allBurgers[i];
      }
    }
  }

  // SET READY BURGER ACCORDING TO RECIPE CONFORMITY
  function handleClickSetReadyBurger() {
    let buildBurgerCopy: FinalProductBurger = structuredClone(buildingBurger);
    const recipeConformity: FinalProductBurger | undefined =
      findRecipeMatch(buildBurgerCopy);
    if (recipeConformity === undefined) {
      buildBurgerCopy.name = customBurgerTitle;
    } else {
      buildBurgerCopy = structuredClone(recipeConformity);
    }
    setReadyBurger([...readyBurger, buildBurgerCopy]);
    setBuildingBurger(emptyBurgerObject);
  }

  return {
    handleClickSetReadyBurger,
  };
}

export default GetReadyBurger;
