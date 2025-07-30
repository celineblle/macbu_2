import React, { useState } from "react";
import Fries from "./Fries";
import Nugget from "./Nugget";
import AssemblyKitchen from "./AssemblyKitchen";
import Grill from "./Grill";
import "../../style/Kitchen.css";
import {
  NuggetBoxStock,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import { FinalProductSide } from "../../interfaces/produitsInterfaces";
import { frying } from "../../elements/ingredients";
import { AvailableFrying } from "../../interfaces/compositionElementsInterfaces";

function Kitchen({
  stocksRawsIngredients,
  setStocksRawsIngredients,
  readyPortionFries,
  setReadyPortionFries,
  readyNuggetBox,
  setReadyNuggetBox,
}: {
  stocksRawsIngredients: SectionRawIngredients[];
  setStocksRawsIngredients: React.Dispatch<
    React.SetStateAction<SectionRawIngredients[]>
  >;
  readyPortionFries: FinalProductSide[];
  setReadyPortionFries: React.Dispatch<
    React.SetStateAction<FinalProductSide[]>
  >;
  readyNuggetBox: [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
  setReadyNuggetBox: React.Dispatch<
    React.SetStateAction<[NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]>
  >;
}) {
  // NUGGET VARIABLES

  const [availableFrying, setAvailableFrying] = useState<
    [
      AvailableFrying,
      AvailableFrying,
      AvailableFrying,
      AvailableFrying,
      AvailableFrying
    ]
  >([
    {
      frying: frying[0],
      quantity: 0,
    },
    {
      frying: frying[1],
      quantity: 0,
    },
    {
      frying: frying[2],
      quantity: 0,
    },
    {
      frying: frying[3],
      quantity: 0,
    },
    {
      frying: frying[4],
      quantity: 0,
    },
  ]);

  return (
    <div id="kitchenComponent">
      <Fries
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
        readyPortionFries={readyPortionFries}
        setReadyPortionFries={setReadyPortionFries}
      />
      <Nugget
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
        readyNuggetBox={readyNuggetBox}
        setReadyNuggetBox={setReadyNuggetBox}
        availableFrying={availableFrying}
        setAvailableFrying={setAvailableFrying}
      />
      <AssemblyKitchen
        availableFrying={availableFrying}
        setAvailableFrying={setAvailableFrying}
      />
      <Grill />
    </div>
  );
}

export default Kitchen;
