import React from "react";
import Fries from "./Fries";
import Nugget from "./Nugget";
import AssemblyKitchen from "./AssemblyKitchen";
import Grill from "./Grill";
import "../../style/Kitchen.css";
import { SectionRawIngredients } from "../../interfaces/compositionElementsInterfaces";
import { FinalProductSide } from "../../interfaces/produitsInterfaces";

function Kitchen({
  stocksRawsIngredients,
  setStocksRawsIngredients,
  readyPortionFries,
  setReadyPortionFries,
}: {
  stocksRawsIngredients: SectionRawIngredients[];
  setStocksRawsIngredients: React.Dispatch<
    React.SetStateAction<SectionRawIngredients[]>
  >;
  readyPortionFries: FinalProductSide[];
  setReadyPortionFries: React.Dispatch<
    React.SetStateAction<FinalProductSide[]>
  >;
}) {
  return (
    <div id="kitchenComponent">
      <Fries
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
        readyPortionFries={readyPortionFries}
        setReadyPortionFries={setReadyPortionFries}
      />
      <Nugget />
      <AssemblyKitchen />
      <Grill />
    </div>
  );
}

export default Kitchen;
