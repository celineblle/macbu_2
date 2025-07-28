import React, { useEffect, useRef, useState } from "react";
import {
  removeElementFromRefArray,
  setActionModal,
} from "../../functions/generalsFuctions";
import "../../style/Fries.css";
import {
  ProductionTray,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import {
  FinalProductSide,
  Ingredient,
} from "../../interfaces/produitsInterfaces";
import { fries, size } from "../../elements/ingredients";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
} from "../../functions/inventoryManagementFunctions";
import { Slide, ToastContainer, toast } from "react-toastify";
import { displayNoPlaceFries } from "../../functions/toastFunctions";

function Fries({
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
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  // LIMITES SIZE & PLACE HOLDER VARIABLES
  const limiteSizeFryer: number = 6;
  const limiteSizeFriesHolder: number = 18;
  const emptyFries: string = "Vide";

  // FRIES COOKING SYSTEME VARIABLES

  const [cookingFries, setCookingFries] = useState<Ingredient[]>([]);
  const [readyFries, setReadyFries] = useState<Ingredient[]>([]);
  const [grilledFries, setGrilledFries] = useState<Ingredient[]>([]);
  const [timeOutKeepingWarmFries, setTimeOutKeepingWarmFries] = useState<
    number[]
  >([]);
  const [emptyPlaceFries, setEmptyPlaceFries] = useState<string[]>([]);
  const cookingFriesRef = useRef<Ingredient[]>([]);
  const readyFriesRef = useRef<Ingredient[]>([]);
  const grilledFriesRef = useRef<Ingredient[]>([]);

  // BUILDING PORTION SYSTEME VARIABLES

  const [productionTray, setProductionTray] = useState<
    [ProductionTray, ProductionTray]
  >([
    {
      productName: "Frite",
      ingredient: "Frite",
      quantity: 0,
      grilled: false,
      type: "fries",
    },
    {
      productName: "Potatoe",
      ingredient: "Potatoe",
      quantity: 0,
      grilled: false,
      type: "fries",
    },
  ]);
  const [timeOutTray, setTimeOutTray] = useState<number[]>([]);
  const [portion, setPortion] = useState<FinalProductSide>({
    name: "Vide",
    ingredient: {
      side: "Vide",
      grilled: false,
    },
    size: 0,
    timeId: 0,
    timeObject: 0,
    price: 0,
    type: "fries",
  });
  const [emptyPlaceTray, setEmptyPlaceTray] = useState<string[]>([]);

  // UPDATE REF

  useEffect(() => {
    cookingFriesRef.current = cookingFries;
  }, [cookingFries]);

  useEffect(() => {
    readyFriesRef.current = readyFries;
  }, [readyFries]);

  useEffect(() => {
    grilledFriesRef.current = grilledFries;
  }, [grilledFries]);

  // UPDATE EMPTY PLACE IN FRYER AND TRAY

  function updateEmptyPlace(
    takenPlaces: number,
    limitSizePlace: number,
    setterEmptyPlace: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    const emptyPlace: number = limitSizePlace - takenPlaces;
    const emptyPlaceArray: string[] = [];
    if (emptyPlace > 0) {
      for (let i = 0; i < emptyPlace; i++) {
        emptyPlaceArray.push(emptyFries);
      }
    }
    setterEmptyPlace(emptyPlaceArray);
  }

  useEffect(() => {
    const takenPlaces: number =
      cookingFries.length + readyFries.length + grilledFries.length;
    updateEmptyPlace(takenPlaces, limiteSizeFryer, setEmptyPlaceFries);
  }, [cookingFries, readyFries, grilledFries]);

  useEffect(() => {
    const takenPlaces: number = readyPortionFries.length;
    updateEmptyPlace(takenPlaces, limiteSizeFriesHolder, setEmptyPlaceTray);
  }, [readyPortionFries]);

  // COOKING RAW FRIES FROM FRIDGE AND KEEPING WARM

  function readyFriesGoToGrilledFries(fries: Ingredient) {
    const timerId: number = setTimeout(() => {
      setGrilledFries([...grilledFriesRef.current, fries]);
      removeElementFromRefArray(readyFriesRef, fries, setReadyFries);
    }, 1000);
    setTimeOutKeepingWarmFries([...timeOutKeepingWarmFries, timerId]);
  }

  function handleClickCookingRawFries(fries: Ingredient) {
    if (emptyPlaceFries.length > 0) {
      // Start a new cooking portion
      const cookingFriesCopy: Ingredient[] = cookingFries.slice();
      cookingFriesCopy.push(fries);
      setCookingFries(cookingFriesCopy);

      // Update stock
      const updatedIngredient: Ingredient = removeToStockOfProduct(fries);
      const updatedStockArray: SectionRawIngredients[] =
        remplaceOldProductByUpdateProduct("fries", updatedIngredient);
      setStocksRawsIngredients(updatedStockArray);

      // Start cooking time timer
      setTimeout(() => {
        setReadyFries([...readyFriesRef.current, fries]);
        removeElementFromRefArray(cookingFriesRef, fries, setCookingFries);
        readyFriesGoToGrilledFries(fries);
      }, 1000);
    } else {
      displayNoPlaceFries();
    }
  }

  return (
    <div id="friesComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Frite
        </button>
      </div>
      <div id="friesPageContent">
        <>
          <h3>Pret</h3>
          {productionTray.map((tray) => (
            <button>
              {tray.productName} : {tray.quantity}
            </button>
          ))}
        </>
        <hr />
        <></>
      </div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
          <div className="headerModal">
            <h2>Frites</h2>
            <button className="closeModalButton">X</button>
          </div>
          <br />
          <div id="friesModalContent">
            <div>
              <div>
                <h3>Fabrication des portions</h3>
                {productionTray.map((tray) => (
                  <button key={tray.productName}>
                    {tray.productName} : {tray.quantity}
                  </button>
                ))}
                {size.map((size) => (
                  <button key={size.name}>{size.name}</button>
                ))}
              </div>
              <br />
              <hr />
              <div>
                <h3>Pret</h3>
                {readyPortionFries.map((readyPortion, i) => (
                  <button key={i}>{readyPortion.ingredient.side}</button>
                ))}
                {emptyPlaceTray.map((place, i) => (
                  <button key={i}>{place}</button>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <div>
                <h3>Cuisson</h3>
                {fries.map((ingredient) => (
                  <button
                    key={ingredient.ingredientName}
                    onClick={() => handleClickCookingRawFries(ingredient)}
                  >
                    {ingredient.ingredientName}
                  </button>
                ))}
                {cookingFries.map((fries, i) => (
                  <button key={i}>{fries.ingredientName}</button>
                ))}
                {readyFries.map((fries, i) => (
                  <button key={i}>{fries.ingredientName}</button>
                ))}
                {grilledFries.map((fries, i) => (
                  <button key={i}>{fries.ingredientName}</button>
                ))}
                {emptyPlaceFries.map((place, i) => (
                  <button key={i}>{place}</button>
                ))}
              </div>
              <br />
              <hr />
              <div>
                <h3>Stocks</h3>
                <ul>
                  {stocksRawsIngredients[6].productionArray.map(
                    (friesStock) => (
                      <li key={friesStock.ingredientName}>
                        {friesStock.ingredientName} : {friesStock.currentStocks}
                      </li>
                    )
                  )}
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

export default Fries;
