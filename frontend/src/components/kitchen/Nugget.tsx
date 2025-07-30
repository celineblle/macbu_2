import React, { useEffect, useRef, useState } from "react";
import {
  removeElementFromRefArray,
  setActionModal,
  updateEmptyPlace,
} from "../../functions/generalsFuctions";
import "../../style/Nugget.css";
import {
  NuggetBoxStock,
  SectionRawIngredients,
  AvailableFrying,
} from "../../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../../interfaces/produitsInterfaces";
import { frying } from "../../elements/ingredients";
import { displayNoPlace, displayNoStock } from "../../functions/toastFunctions";
import { removeToStockOfProduct, remplaceOldProductByUpdateProduct } from "../../functions/inventoryManagementFunctions";

function Nugget({
  stocksRawsIngredients,
  setStocksRawsIngredients,
  readyNuggetBox,
  setReadyNuggetBox,
  availableFrying,
  setAvailableFrying,
}: {
  stocksRawsIngredients: SectionRawIngredients[];
  setStocksRawsIngredients: React.Dispatch<
    React.SetStateAction<SectionRawIngredients[]>
  >;
  readyNuggetBox: [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
  setReadyNuggetBox: React.Dispatch<
    React.SetStateAction<[NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]>
  >;
  availableFrying: 
    AvailableFrying[];
  setAvailableFrying: React.Dispatch<
    React.SetStateAction<
      
        AvailableFrying[]
      
    >
  >;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  // LIMIT SIZE VARIABLES & PLACE HOLDER
  const limitSizeFryer: number = 6;
  const emptyFrying: string = "Vide";
  const indexRawStock: number = 0;

  // FRYERS VARIABLES
  const [cookingFrying, setCookingFrying] = useState<Ingredient[]>([]);
  const [readyFrying, setReadyFrying] = useState<Ingredient[]>([]);
  const [grilledFrying, setGrilledFrying] = useState<Ingredient[]>([]);
  const [emptyPlace, setEmptyPlace] = useState<string[]>([]);

  const cookingFryingRef = useRef<Ingredient[]>([]);
  const readyFryingRef = useRef<Ingredient[]>([]);
  const grilledFryingRef = useRef<Ingredient[]>([]);

  // UPDATE REF

  useEffect(() => {
    cookingFryingRef.current = cookingFrying;
  }, [cookingFrying]);

  useEffect(() => {
    readyFryingRef.current = readyFrying;
  }, [readyFrying]);

  useEffect(() => {
    grilledFryingRef.current = grilledFrying;
  }, [grilledFrying]);

  // UPDATE EMPTY PLACE ARRAY

  useEffect(() => {
    const takenPlaces: number =
      cookingFrying.length + readyFrying.length + grilledFrying.length;
    updateEmptyPlace(takenPlaces, limitSizeFryer, setEmptyPlace, emptyFrying);
  }, [cookingFrying, readyFrying, grilledFrying]);

  // KEEPING WARM TIMER FOR READY FRYING

  function keepingWarmFrying(frying: Ingredient): number {
    const timerId: number = setTimeout(() => {
      setGrilledFrying([...grilledFryingRef.current, frying]);
      removeElementFromRefArray(readyFryingRef, frying, setReadyFrying);
    }, 10000);
    return timerId;
  }

  // START COOKING FRYING

  function handleClickStartCooking(frying: Ingredient) {
    if (emptyPlace.length > 0) {
      //check stock available
      const haveStock: number | undefined = stocksRawsIngredients[
        indexRawStock
      ].productionArray.findIndex(
        (ingredientStock) =>
          ingredientStock.ingredientName === frying.ingredientName
      );
      if (
        haveStock !== undefined &&
        stocksRawsIngredients[indexRawStock].productionArray[haveStock]
          .currentStocks > 0
      ) {
        // start cooking
        setCookingFrying([...cookingFrying, frying]);
        //update stock
        const updateIngredient: Ingredient = removeToStockOfProduct(frying);
        const updateStockArray =  remplaceOldProductByUpdateProduct("frying", updateIngredient)
        setStocksRawsIngredients(updateStockArray);
        // start cooking time timer
        setTimeout(() => {
          const timerId: number = keepingWarmFrying(frying);
          frying.timerId = timerId;
          setReadyFrying([...readyFryingRef.current, frying]);
          removeElementFromRefArray(cookingFryingRef, frying, setCookingFrying);
        }, 2000);
      } else {
        displayNoStock();
      }
    } else {
      displayNoPlace();
    }
  }

  // REMOVE FRYING FROM FRYER

  function handleClickRemoveReadyFryingFromFryer(frying: Ingredient) {
    removeElementFromRefArray(readyFryingRef, frying, setReadyFrying);
    clearTimeout(frying.timerId);
    const availableIndex: number = availableFrying.findIndex(
      (avaFry) => avaFry.frying.ingredientName === frying.ingredientName
    );
    const availableFryingCopy: 
      AvailableFrying[] = availableFrying.slice() 
    availableFryingCopy[availableIndex].quantity =
      availableFryingCopy[availableIndex].quantity + frying.quantity;
    setAvailableFrying(availableFryingCopy);
  }

  // REMOVE GRILLED FRYING

  function handleClickRemoveGrilledFrying(frying: Ingredient) {
    removeElementFromRefArray(grilledFryingRef, frying, setGrilledFrying);
  }

  // BUILD NUGGET BOX

  function handleClickBuildNuggetBox(boxSize: NuggetBoxStock) {
    if (
      availableFrying[0].quantity >= boxSize.boite.ingredient.nuggetQuantity
    ) {
      const availableFryingCopy: AvailableFrying[] = availableFrying.slice() 
      availableFryingCopy[0].quantity =
        availableFryingCopy[0].quantity -
        boxSize.boite.ingredient.nuggetQuantity;
      setAvailableFrying(availableFryingCopy);
      const boxNuggetCopy = readyNuggetBox.slice() as [
        NuggetBoxStock,
        NuggetBoxStock,
        NuggetBoxStock
      ];
      const boxIndex: number = boxNuggetCopy.findIndex(
        (box) => box.boite.name === boxSize.boite.name
      );
      boxNuggetCopy[boxIndex].quantity = boxNuggetCopy[boxIndex].quantity + 1;
      setReadyNuggetBox(boxNuggetCopy);
    } else {
      displayNoStock();
    }
  }

  return (
    <div id="nuggetComponent" className="component">
      <button
        className="buttonOpenModal"
        onClick={() => setActionModal(setToggleModal, toggleModal)}
      >
        Friture
      </button>
      <div id="nuggetPageContent">
        <ul>
          {readyNuggetBox.map((box) => (
            <li key={box.boite.name}>
              {box.boite.name} : {box.quantity}
            </li>
          ))}
          {availableFrying.map((frying) => (
            <li key={frying.frying.ingredientName}>
              {frying.frying.ingredientName} : {frying.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Friture</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="grillModalContent">
            <div>
              <div>
                <h3>Pret</h3>
                <ul>
                  {availableFrying.map((frying: AvailableFrying) => (
                    <li key={frying.frying.ingredientName}>
                      {frying.frying.ingredientName} : {frying.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Boite a nugget</h3>

                <div>
                  <h4>Fabrication</h4>
                  {readyNuggetBox.map((box: NuggetBoxStock) => (
                    <button
                      key={box.boite.name}
                      onClick={() => handleClickBuildNuggetBox(box)}
                    >
                      {box.boite.name}
                    </button>
                  ))}
                </div>
                <div>
                  <h4>Pret</h4>
                  <ul>
                    {readyNuggetBox.map((box: NuggetBoxStock) => (
                      <li key={box.boite.name}>
                        {box.boite.name} : {box.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Cuisson</h3>
                <div>
                  {grilledFrying.map((frying: Ingredient) => (
                    <button
                      key={frying.timerId}
                      onClick={() => handleClickRemoveGrilledFrying(frying)}
                    >
                      {frying.ingredientName}
                    </button>
                  ))}
                  {readyFrying.map((frying: Ingredient) => (
                    <button
                      key={frying.timerId}
                      onClick={() =>
                        handleClickRemoveReadyFryingFromFryer(frying)
                      }
                    >
                      {frying.ingredientName}
                    </button>
                  ))}
                  {cookingFrying.map((frying: Ingredient, i) => (
                    <button key={i}>{frying.ingredientName}</button>
                  ))}

                  {emptyPlace.map((place: string, i) => (
                    <button key={i}>{place}</button>
                  ))}
                </div>
                <h3>Frigo</h3>
                <div>
                  {frying.map((frying: Ingredient) => (
                    <button
                      key={frying.ingredientName}
                      onClick={() => handleClickStartCooking(frying)}
                    >
                      {frying.ingredientName}
                    </button>
                  ))}
                </div>
                <h3>Stocks frigo</h3>
                <ul>
                  {frying.map((frying: Ingredient) => (
                    <li key={frying.ingredientName}>
                      {frying.ingredientName} : {frying.currentStocks}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3>Commandes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nugget;
