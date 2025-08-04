import { createContext } from "react";
import { allProductsArray } from "../elements/ingredients";
import { SectionRawIngredients } from "../interfaces/compositionElementsInterfaces";

const allProductCopy: SectionRawIngredients[] = allProductsArray.slice();
export const StocksRawsIngredientsContext = createContext<SectionRawIngredients[]>(allProductCopy)

export const SetStocksRawsIngredientsContext = createContext< React.Dispatch<React.SetStateAction<SectionRawIngredients[]>> | undefined>(undefined)