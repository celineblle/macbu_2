import React, { useContext } from "react";
import { emptyBurger, tabIngredient } from "./assemblyKitchenTools";
import {
  AvailableMeat,
  TabsIngredients,
} from "../../../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../../../interfaces/produitsInterfaces";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
} from "../../../functions/inventoryManagementFunctions";
import { frying, meat } from "../../../elements/ingredients";
import { displayNoStock } from "../../../functions/toastFunctions";
import { FinalProductBurger } from "../../../interfaces/produitsInterfaces";
import {
  SetStocksRawsIngredientsContext,
  StocksRawsIngredientsContext,
} from "../../../context/StockRawsContext";

export function BuildingBurgerFonctions({
  buildingBurger,
  setBuildingBurger,
  availableFrying,
  setAvailableFrying,
  availableGrill,
  setAvailableGrill,
}: {
  buildingBurger: FinalProductBurger;
  setBuildingBurger: React.Dispatch<React.SetStateAction<FinalProductBurger>>;

  availableFrying: AvailableMeat[];
  setAvailableFrying: React.Dispatch<React.SetStateAction<AvailableMeat[]>>;
  availableGrill: AvailableMeat[];
  setAvailableGrill: React.Dispatch<React.SetStateAction<AvailableMeat[]>>;
}) {
  //CONTEXTS
  const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);
  const setStocksRawsIngredients = useContext(SetStocksRawsIngredientsContext);

  // CHECK PROPERTY ARRAY : EMPTY  & ALREADY INGREDIENT

  function checkEmptyVariableInArray(propertyContent: string[]): boolean {
    return propertyContent.length === 0 ? true : false;
  }

  function checkIfIngredientAlreadyInArray(
    propertyContent: string[],
    ingredient: string
  ): boolean {
    return propertyContent.find((ingArray) => ingArray === ingredient) ===
      undefined
      ? false
      : true;
  }

  // REMOVE STOCK FOR DIFFERENT ARRAY

  function removeStockFromAvailableArray(
    availableArray: AvailableMeat[],
    availableSetter: React.Dispatch<React.SetStateAction<AvailableMeat[]>>,
    ingredient: Ingredient
  ) {
    const availableArrayCopy: AvailableMeat[] = availableArray.slice();
    const ingredientIndex: number = availableArrayCopy.findIndex(
      (meat) => meat.meat.ingredientName === ingredient.ingredientName
    );
    availableArrayCopy[ingredientIndex].quantity =
      availableArrayCopy[ingredientIndex].quantity - 1;
    availableSetter(availableArrayCopy);
  }

  function removeStockFromSectionRawStock(
    ingredient: Ingredient,
    sectionName: string
  ) {
    const updateIngredient = removeToStockOfProduct(ingredient);
    const updateStocks = remplaceOldProductByUpdateProduct(
      sectionName,
      updateIngredient
    );
    if (setStocksRawsIngredients !== undefined) {
      setStocksRawsIngredients(updateStocks);
    }
  }

  // RESTORE STOCKS

  function restoreStockGlobalSectionArray(ingredient: string, section: string) {
    const globalStockArrayCopy = stocksRawsIngredients.slice();
    for (let i = 0; i < globalStockArrayCopy.length; i++) {
      if (globalStockArrayCopy[i].sectionName === section) {
        const ingredientIndex = globalStockArrayCopy[
          i
        ].productionArray.findIndex(
          (testedIngredient) => testedIngredient.ingredientName === ingredient
        );
        globalStockArrayCopy[i].productionArray[ingredientIndex].currentStocks =
          globalStockArrayCopy[i].productionArray[ingredientIndex]
            .currentStocks + 1;
        if (setStocksRawsIngredients !== undefined) {
          setStocksRawsIngredients(globalStockArrayCopy);
        }
      }
    }
  }

  function restoreStockAvailableArray(
    ingredient: string,
    availableArray: AvailableMeat[]
  ) {
    const availableArrayCopy = availableArray.slice();
    const ingredientIndex = availableArrayCopy.findIndex(
      (testedIngredient) => testedIngredient.meat.ingredientName === ingredient
    );
    availableArrayCopy[ingredientIndex].quantity =
      availableArrayCopy[ingredientIndex].quantity + 1;
    return availableArrayCopy;
  }

  // FIND INGREDIENT, ARRAY AND SECTION

  function findOriginalIngredientFromName(
    ingredientName: string
  ): string | undefined {
    for (let i = 0; i < stocksRawsIngredients.length; i++) {
      const ingredientFinder = stocksRawsIngredients[i].productionArray.find(
        (ingredientRaw) => ingredientRaw.ingredientName === ingredientName
      );
      if (ingredientFinder !== undefined) {
        return stocksRawsIngredients[i].sectionName;
      }
    }
  }

  function findCorrectStockArrayTypeFromSectionAndLaunchRestoration(
    ingredient: string,
    section: string
  ) {
    if (section !== "frying" && section !== "meat") {
      restoreStockGlobalSectionArray(ingredient, section);
    } else if (section === "frying") {
      const updateArray = restoreStockAvailableArray(
        ingredient,
        availableFrying
      );
      setAvailableFrying(updateArray);
    } else if (section === "meat") {
      const updateArray = restoreStockAvailableArray(
        ingredient,
        availableGrill
      );
      setAvailableGrill(updateArray);
    }
  }

  function findTheBuildingBurgerProperty(
    ingredient: string
  ): TabsIngredients | undefined {
    for (let i = 0; i < tabIngredient.length; i++) {
      if (
        tabIngredient[i].correspondingArray.find(
          (product) => product.ingredientName === ingredient
        ) !== undefined
      ) {
        return tabIngredient[i];
      }
    }
  }

  // ADD INGREDIENT ACCORDING THE DESTINATION TYPE

  function addAStringIngredient(ingredient: Ingredient, section: string) {
    if (ingredient.ingredientName !== buildingBurger.ingredient[section]) {
      const buildingBurgerCopy = structuredClone(buildingBurger);
      if (
        buildingBurgerCopy.ingredient[section] !== emptyBurger &&
        buildingBurgerCopy.ingredient[section] !== ingredient.ingredientName
      ) {
        const sectionName: string | undefined = findOriginalIngredientFromName(
          buildingBurgerCopy.ingredient[section]
        );
        if (sectionName !== undefined) {
          findCorrectStockArrayTypeFromSectionAndLaunchRestoration(
            buildingBurgerCopy.ingredient[section],
            sectionName
          );
        }
      }
      buildingBurgerCopy.ingredient[section] = ingredient.ingredientName;
      setBuildingBurger(buildingBurgerCopy);

      if (
        section === "meat" &&
        meat.find((meat) => meat.ingredientName === ingredient.ingredientName)
      ) {
        removeStockFromAvailableArray(
          availableGrill,
          setAvailableGrill,
          ingredient
        );
      } else if (
        section === "meat" &&
        frying.find(
          (frying) => frying.ingredientName === ingredient.ingredientName
        )
      ) {
        removeStockFromAvailableArray(
          availableFrying,
          setAvailableFrying,
          ingredient
        );
      } else {
        removeStockFromSectionRawStock(ingredient, section);
      }
    }
  }

  function addAnArrayIngredient(ingredient, section) {
    const buildingBurgerCopy = structuredClone(buildingBurger);

    const isItEmpty: boolean = checkEmptyVariableInArray(
      buildingBurgerCopy.ingredient[section]
    );
    if (isItEmpty === false) {
      const alreadyIn: boolean = checkIfIngredientAlreadyInArray(
        buildingBurgerCopy.ingredient[section],
        ingredient.ingredientName
      );
      if (alreadyIn === false) {
        buildingBurgerCopy.ingredient[section].push(ingredient.ingredientName);
        removeStockFromSectionRawStock(ingredient, section);
      }
    } else {
      buildingBurgerCopy.ingredient[section].push(ingredient.ingredientName);
      removeStockFromSectionRawStock(ingredient, section);
    }
    setBuildingBurger(buildingBurgerCopy);
  }

  // ADD NEW INGREDIENT IN BUILDING BURGER

  function addNewIngredientInBuildingBurger(
    ingredient: Ingredient,
    ingredientQuantity: number
  ) {
    // check if ingredient is available
    if (ingredientQuantity > 0) {
      // find the correct section of ingredient
      let section: string | undefined = findOriginalIngredientFromName(
        ingredient.ingredientName
      );
      // add ingredient according property and type
      if (section !== undefined) {
        if (section === "frying") {
          section = "meat";
        }
        if (typeof buildingBurger.ingredient[section] === "string") {
          addAStringIngredient(ingredient, section);
        } else if (Array.isArray(buildingBurger.ingredient[section])) {
          addAnArrayIngredient(ingredient, section);
        }
      }
    } else {
      displayNoStock();
    }
  }

  // REMOVE INGREDIENT DIRECTLY FROM BUILDING BURGER

  function handleClickRemoveIngredientFromBuildingBurgerForGlobalStock(
    ingredient: string
  ) {
    //FIND PROPERTY AND REMOVE FROM THE BUILDING BURGER
    const propertyFromTabArray: TabsIngredients | undefined =
      findTheBuildingBurgerProperty(ingredient);
    if (propertyFromTabArray !== undefined) {
      const buildingBugerCopy = structuredClone(buildingBurger);
      if (
        typeof buildingBurger.ingredient[propertyFromTabArray.section] ===
        "string"
      ) {
        buildingBugerCopy.ingredient[propertyFromTabArray.section] =
          emptyBurger;
      } else if (
        Array.isArray(buildingBurger.ingredient[propertyFromTabArray.section])
      ) {
        if (
          buildingBugerCopy.ingredient[propertyFromTabArray.section].length > 1
        ) {
          const ingredientIndex = buildingBugerCopy.ingredient[
            propertyFromTabArray.section
          ].findIndex((testedIngredient) => testedIngredient === ingredient);
          if (ingredientIndex !== -1) {
            buildingBugerCopy.ingredient[propertyFromTabArray.section].splice(
              ingredientIndex,
              1
            );
          }
        } else {
          buildingBugerCopy.ingredient[propertyFromTabArray.section] = [];
        }
      }

      setBuildingBurger(buildingBugerCopy);

      // RESTORE IN THE STOCK
      if (propertyFromTabArray.tabName === tabIngredient[2].tabName) {
        findCorrectStockArrayTypeFromSectionAndLaunchRestoration(
          ingredient,
          "frying"
        );
      } else {
        findCorrectStockArrayTypeFromSectionAndLaunchRestoration(
          ingredient,
          propertyFromTabArray.section
        );
      }
    }
  }
  return {
    addNewIngredientInBuildingBurger,
    handleClickRemoveIngredientFromBuildingBurgerForGlobalStock,
  };
}

export default BuildingBurgerFonctions;
