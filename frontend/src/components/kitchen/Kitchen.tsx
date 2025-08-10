import React, { useState } from "react";
import Fries from "./Fries";
import Nugget from "./Nugget";
import AssemblyKitchen from "./assemblyKitchenFiles/AssemblyKitchen";
import Grill from "./Grill";
import "../../style/Kitchen.css";
import {
  AvailableMeat,
  NuggetBoxStock,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import {
  FinalProductBurger,
  FinalProductSide,
} from "../../interfaces/produitsInterfaces";
import { frying, meat } from "../../elements/ingredients";

function Kitchen({
  stocksRawsIngredients,
  setStocksRawsIngredients,
  readyPortionFries,
  setReadyPortionFries,
  readyNuggetBox,
  setReadyNuggetBox,
  readyBurger,
  setReadyBurger,
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
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
}) {
  // NUGGET VARIABLES

  const [availableFrying, setAvailableFrying] = useState<AvailableMeat[]>([
    {
      meat: frying[0],
      quantity: 0,
    },
    {
      meat: frying[1],
      quantity: 0,
    },
    {
      meat: frying[2],
      quantity: 0,
    },
    {
      meat: frying[3],
      quantity: 0,
    },
    {
      meat: frying[4],
      quantity: 0,
    },
  ]);

  // GRILL VARIABLE

  const [availableGrill, setAvailableGrill] = useState<AvailableMeat[]>([
    {
      meat: meat[0],
      quantity: 0,
    },
    {
      meat: meat[1],
      quantity: 0,
    },
    {
      meat: meat[2],
      quantity: 0,
    },
    {
      meat: meat[3],
      quantity: 0,
    },
    {
      meat: meat[4],
      quantity: 0,
    },
    {
      meat: meat[5],
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
        availableGrill={availableGrill}
        setAvailableGrill={setAvailableGrill}
        readyBurger={readyBurger}
        setReadyBurger={setReadyBurger}
      />
      <Grill
        stocksRawsIngredients={stocksRawsIngredients}
        setStocksRawsIngredients={setStocksRawsIngredients}
        availableGrill={availableGrill}
        setAvailableGrill={setAvailableGrill}
      />
    </div>
  );
}

export default Kitchen;
