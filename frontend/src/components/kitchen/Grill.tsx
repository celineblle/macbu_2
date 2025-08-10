import React, { useEffect, useRef, useState } from "react";
import "../../style/Grill.css";
import {
  AvailableMeat,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../../interfaces/produitsInterfaces";
import {
  updateEmptyPlace,
  removeElementFromRefArray,
  setActionModal,
} from "../../functions/generalsFuctions";
import { displayNoPlace, displayNoStock } from "../../functions/toastFunctions";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
} from "../../functions/inventoryManagementFunctions";

function Grill({
  stocksRawsIngredients,
  setStocksRawsIngredients,
  availableGrill,
  setAvailableGrill,
}: {
  stocksRawsIngredients: SectionRawIngredients[];
  setStocksRawsIngredients: React.Dispatch<
    React.SetStateAction<SectionRawIngredients[]>
  >;
  availableGrill: AvailableMeat[];
  setAvailableGrill: React.Dispatch<React.SetStateAction<AvailableMeat[]>>;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  // LIMIT SIZE & PLACE HOLDER VARIABLE
  const limiteSizeGrill: number = 8;
  const emptyGrill: string = "Vide";
  const indexRawArray: number = 4;

  // GRILL VARIABLES
  const [cookingGrill, setCookingGrill] = useState<Ingredient[]>([]);
  const [readyGrill, setReadyGrill] = useState<Ingredient[]>([]);
  const [grilledGrill, setGrilledGrill] = useState<Ingredient[]>([]);
  const cookingGrillRef = useRef<Ingredient[]>([]);
  const readyGrillRef = useRef<Ingredient[]>([]);
  const grilledGrillRef = useRef<Ingredient[]>([]);

  const [emptyPlace, setEmptyPlace] = useState<string[]>([]);

  // UPDATE REF

  useEffect(() => {
    cookingGrillRef.current = cookingGrill;
  }, [cookingGrill]);

  useEffect(() => {
    readyGrillRef.current = readyGrill;
  }, [readyGrill]);

  useEffect(() => {
    grilledGrillRef.current = grilledGrill;
  }, [grilledGrill]);

  // UPDATE EMPTY GRILL PLACE

  useEffect(() => {
    const takenPlaces: number =
      cookingGrill.length + readyGrill.length + grilledGrill.length;
    updateEmptyPlace(takenPlaces, limiteSizeGrill, setEmptyPlace, emptyGrill);
  }, [cookingGrill, readyGrill, grilledGrill]);

  // KEEPING WARM GRILL TIMER

  function keepingWarmGrill(steak: Ingredient): number {
    const timerId: number = setTimeout(() => {
      setGrilledGrill([...grilledGrillRef.current, steak]);
      removeElementFromRefArray(readyGrillRef, steak, setReadyGrill);
    }, 10000);
    return timerId;
  }

  // COOKING RAW STEAK

  function handleClickCookingRawSteak(steak: Ingredient) {
    if (steak.currentStocks > 0) {
      if (emptyPlace.length > 0) {
        // add a uniqueId to the steak
        const uniqueId: number = Date.now();
        steak.dateId = uniqueId;

        setCookingGrill([...cookingGrill, steak]);

        // remove from stock
        const updateIngredient = removeToStockOfProduct(steak);
        const udapteStockArray = remplaceOldProductByUpdateProduct(
          "meat",
          updateIngredient
        );
        setStocksRawsIngredients(udapteStockArray);
        // start cooking time timer
        setTimeout(() => {
          const timerId: number = keepingWarmGrill(steak);
          steak.timerId = timerId;
          setReadyGrill([...readyGrillRef.current, steak]);
          removeElementFromRefArray(cookingGrillRef, steak, setCookingGrill);
        }, 2000);
      } else {
        displayNoPlace();
      }
    } else {
      displayNoStock();
    }
  }

  // SET AVAILABLE COOKING STEAK

  function handleClickRemoveReadySteakFromGrill(steak: Ingredient) {
    removeElementFromRefArray(readyGrillRef, steak, setReadyGrill);
    const steakIndex: number = availableGrill.findIndex(
      (steakGrill) => steakGrill.meat.ingredientName === steak.ingredientName
    );
    const availableGrillCopy: AvailableMeat[] = availableGrill.slice();
    availableGrillCopy[steakIndex].quantity =
      availableGrillCopy[steakIndex].quantity + 1;
    setAvailableGrill(availableGrillCopy);
    clearTimeout(steak.timerId);
  }

  // REMOVE GRILLED STEAK

  function handleClickRemoveGrilledSteak(steak: Ingredient) {
    removeElementFromRefArray(grilledGrillRef, steak, setGrilledGrill);
  }

  return (
    <div id="grillComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          GRILL
        </button>
      </div>
      <div id="stocksListGrillFrontPage">
        <div className="stockListGrill">
          <h3>Pret</h3>
          <ul>
            {availableGrill.map((steak) => (
              <li key={steak.meat.ingredientName}>
                {steak.meat.ingredientName} : {steak.quantity}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="stockListGrill">
          <h3>Stock</h3>
          <ul>
            {stocksRawsIngredients[indexRawArray].productionArray.map(
              (steak) => (
                <li key={steak.ingredientName}>
                  {steak.ingredientName} : {steak.currentStocks}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Grill</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="grillModalContent">
            <div>
              <h3>Pret</h3>
              <ul>
                {availableGrill.map((steak) => (
                  <li key={steak.meat.ingredientName}>
                    {steak.meat.ingredientName} : {steak.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Cuisson</h3>
              {grilledGrill.map((steak) => (
                <button
                  key={steak.dateId}
                  onClick={() => handleClickRemoveGrilledSteak(steak)}
                  className="grilledButton"
                >
                  {steak.ingredientName}
                </button>
              ))}
              {readyGrill.map((steak) => (
                <button
                  key={steak.dateId}
                  onClick={() => handleClickRemoveReadySteakFromGrill(steak)}
                  className="readyButton"
                >
                  {steak.ingredientName}
                </button>
              ))}
              {cookingGrill.map((steak) => (
                <button key={steak.dateId} className="cookingButton">
                  {steak.ingredientName}
                </button>
              ))}
              {emptyPlace.map((place, i) => (
                <button key={i} className="neutralButton">
                  {place}
                </button>
              ))}
            </div>
            <div>
              <h3>Frigo</h3>
              {stocksRawsIngredients[indexRawArray].productionArray.map(
                (steak) => (
                  <div key={steak.ingredientName}>
                    <button
                      onClick={() => handleClickCookingRawSteak(steak)}
                      className="neutralButton"
                    >
                      {steak.ingredientName}
                    </button>
                    <p>Stock : {steak.currentStocks}</p>
                  </div>
                )
              )}
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

export default Grill;
