import React from "react";
import { SectionRawIngredients } from "../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../interfaces/produitsInterfaces";
import { allProductsArray } from "../elements/ingredients";

export function remplaceOldProductByUpdateProduct(
  sectionName: string,
  updateProduct: Ingredient
): SectionRawIngredients[] {
  const allProducts: SectionRawIngredients[] = allProductsArray.slice();
  const indexSection: number = allProducts.findIndex(
    (section) => section.sectionName === sectionName
  );
  const indexProduct: number = allProducts[
    indexSection
  ].productionArray.findIndex(
    (product) => product.ingredientName === updateProduct.ingredientName
  );
  allProducts[indexSection].productionArray.splice(
    indexProduct,
    1,
    updateProduct
  );
  return allProducts;
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
