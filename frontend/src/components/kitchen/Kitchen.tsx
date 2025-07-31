import React, { useState } from "react";
import Fries from "./Fries";
import Nugget from "./Nugget";
import AssemblyKitchen from "./AssemblyKitchen";
import Grill from "./Grill";
import "../../style/Kitchen.css";
import {
  AvailableGrill,
  NuggetBoxStock,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import {
  FinalProductBurger,
  FinalProductSide,
} from "../../interfaces/produitsInterfaces";
import { frying, meat } from "../../elements/ingredients";
import { AvailableFrying } from "../../interfaces/compositionElementsInterfaces";

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

  const [availableFrying, setAvailableFrying] = useState<AvailableFrying[]>([
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

  // GRILL VARIABLE

  const [availableGrill, setAvailableGrill] = useState<AvailableGrill[]>([
    {
      steak: meat[0],
      quantity: 0,
    },
    {
      steak: meat[1],
      quantity: 0,
    },
    {
      steak: meat[2],
      quantity: 0,
    },
    {
      steak: meat[3],
      quantity: 0,
    },
    {
      steak: meat[4],
      quantity: 0,
    },
    {
      steak: meat[5],
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
