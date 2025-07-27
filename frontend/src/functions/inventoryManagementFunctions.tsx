import React from "react";
import { SectionRawIngredients } from "../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../interfaces/produitsInterfaces";

export function remplaceOldProductByUpdateProduct(
  stockIndredientArray: SectionRawIngredients[],
  sectionName: string,
  updateProduct: Ingredient
): SectionRawIngredients[] {
  const indexSection: number = stockIndredientArray.findIndex(
    (section) => section.sectionName === sectionName
  );
  const indexProduct: number = stockIndredientArray[
    indexSection
  ].productionArray.findIndex(
    (product) => product.ingredientName === updateProduct.ingredientName
  );
  stockIndredientArray[indexSection].productionArray.splice(
    indexProduct,
    1,
    updateProduct
  );
  return stockIndredientArray;
}

export function addToStockUniqueProduct(product: Ingredient): Ingredient {
  const productCopy: Ingredient = structuredClone(product);
  productCopy.currentStocks = productCopy.currentStocks + productCopy.quantity;
  return productCopy;
}

export function removeToStockOfProduct(product: Ingredient): Ingredient {
  const productCopy: Ingredient = structuredClone(product);
  productCopy.currentStocks = productCopy.currentStocks - 1;
  return productCopy;
}
