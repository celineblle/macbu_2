import React, { useContext, useEffect, useRef, useState } from "react";
import {
  removeElementFromRefArray,
  setActionModal,
  updateEmptyPlace,
} from "../../functions/generalsFuctions";
import "../../style/Fries.css";
import {
  FriesBuilder,
  ProductionTray,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import {
  FinalProductSide,
  FriesSide,
  Ingredient,
  Size,
} from "../../interfaces/produitsInterfaces";
import { fries, size } from "../../elements/ingredients";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
} from "../../functions/inventoryManagementFunctions";
import { Slide, ToastContainer } from "react-toastify";
import {
  displayIsGrilled,
  displayNoPlace,
  displayNoStock,
  displayPortionNotComplete,
} from "../../functions/toastFunctions";
import { OrdersToPrepareContext } from "../../context/OrderContext";
import ComponentOrder from "../ComponentOrder";

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

  //ORDER CONTEXT
  const ordersToPrepare = useContext(OrdersToPrepareContext);

  // GET FRIES ORDERS
  const [friesOrder, setFriesOrder] = useState<[number, string[]][]>([]);
  function getFries() {
    const allFriesOrder: [number, string[]][] = [];
    for (let i = 0; i < ordersToPrepare.length; i++) {
      const uniqueOrder: [number, string[]] = [i + 1, []];
      for (let j = 0; j < ordersToPrepare[i].products.length; j++) {
        const currentProduct = ordersToPrepare[i].products[j];
        if ("sandwich" in currentProduct) {
          uniqueOrder[1].push(currentProduct.side.name);
        } else if ("side" in currentProduct.ingredient) {
          uniqueOrder[1].push(currentProduct.name);
        }
      }
      if (uniqueOrder[1].length > 0) {
        allFriesOrder.push(uniqueOrder);
      }
    }
    setFriesOrder(allFriesOrder);
  }

  useEffect(() => {
    getFries();
  }, [ordersToPrepare]);

  // ORDER JSX COMPONENT
  const orderTab = ComponentOrder(friesOrder);


  // LIMITES SIZE & PLACE HOLDER VARIABLES
  const limiteSizeFryer: number = 6;
  const limiteSizeFriesHolder: number = 18;
  const emptyFries: string = "Vide";

  // TOOL
  const indexRawGlobalStock: number = 6;

  // FRIES COOKING SYSTEME VARIABLES

  const [cookingFries, setCookingFries] = useState<Ingredient[]>([]);
  const [readyFries, setReadyFries] = useState<Ingredient[]>([]);
  const [grilledFries, setGrilledFries] = useState<Ingredient[]>([]);
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
      timerId: 0,
    },
    {
      productName: "Potatoe",
      ingredient: "Potatoe",
      quantity: 10,
      grilled: false,
      type: "fries",
      timerId: 0,
    },
  ]);
  const [portion, setPortion] = useState<FriesBuilder>({
    ingredient: emptyFries,
    size: emptyFries,
  });
  const [emptyPlaceTray, setEmptyPlaceTray] = useState<string[]>([]);
  const productionTrayRef = useRef<[ProductionTray, ProductionTray]>([
    {
      productName: "Frite",
      ingredient: "Frite",
      quantity: 0,
      grilled: false,
      type: "fries",
      timerId: 0,
    },
    {
      productName: "Potatoe",
      ingredient: "Potatoe",
      quantity: 0,
      grilled: false,
      type: "fries",
      timerId: 0,
    },
  ]);

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

  useEffect(() => {
    productionTrayRef.current = productionTray;
  }, [productionTray]);

  // UPDATE EMPTY PLACE IN FRYER AND TRAY

  useEffect(() => {
    const takenPlaces: number =
      cookingFries.length + readyFries.length + grilledFries.length;
    updateEmptyPlace(
      takenPlaces,
      limiteSizeFryer,
      setEmptyPlaceFries,
      emptyFries
    );
  }, [cookingFries, readyFries, grilledFries]);

  useEffect(() => {
    const takenPlaces: number = readyPortionFries.length;
    updateEmptyPlace(
      takenPlaces,
      limiteSizeFriesHolder,
      setEmptyPlaceTray,
      emptyFries
    );
  }, [readyPortionFries]);

  // COOKING RAW FRIES FROM FRIDGE AND KEEPING WARM

  function readyFriesGoToGrilledFries(fries: Ingredient): number {
    const timerId: number = setTimeout(() => {
      setGrilledFries([...grilledFriesRef.current, fries]);
      removeElementFromRefArray(readyFriesRef, fries, setReadyFries);
    }, 2000);
    return timerId;
  }

  function handleClickCookingRawFries(fries: Ingredient) {
    // check if place in array is available
    if (emptyPlaceFries.length > 0) {
      const indexIngredientInStock: number = stocksRawsIngredients[
        indexRawGlobalStock
      ].productionArray.findIndex(
        (ingredient) => ingredient.ingredientName === fries.ingredientName
      );
      // check if stock is available
      if (
        stocksRawsIngredients[indexRawGlobalStock].productionArray[
          indexIngredientInStock
        ].currentStocks > 0
      ) {
        // add a unique id to the fries
        const uniqueID: number = Date.now();
        fries.dateId = uniqueID;
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
          const timerId: number = readyFriesGoToGrilledFries(fries);
          fries.timerId = timerId;
          setReadyFries([...readyFriesRef.current, fries]);
          removeElementFromRefArray(cookingFriesRef, fries, setCookingFries);
        }, 1000);
      } else {
        displayNoStock();
      }
    } else {
      displayNoPlace();
    }
  }

  // SET READY FRIES IN FRIES TRAY

  function handleClickSetReadyFriesInFriesTray(product: Ingredient) {
    //identify the good tray
    const trayIndex: number = productionTray.findIndex(
      (tray) => tray.productName === product.ingredientName
    );

    // identify if the tray is grilled
    if (productionTray[trayIndex].grilled === true) {
      displayIsGrilled();
    } else {
      // add ready fries in the tray
      const trayArrayCopie: [ProductionTray, ProductionTray] =
        productionTray.slice() as [ProductionTray, ProductionTray];
      trayArrayCopie[trayIndex].quantity =
        trayArrayCopie[trayIndex].quantity + product.quantity;
      setProductionTray(trayArrayCopie);

      // start keeping warm timer
      keepingWarmTrayTimer(trayIndex);

      // remove ready fries of the array & clear timer
      removeElementFromRefArray(readyFriesRef, product, setReadyFries);
      clearTimeout(product.timerId);
    }
  }

  // KEEPING WARM TRAY TIMER

  function keepingWarmTrayTimer(trayIndex: number) {
    const timerId = setTimeout(() => {
      const trayRefCopy: [ProductionTray, ProductionTray] =
        productionTrayRef.current.slice() as [ProductionTray, ProductionTray];
      trayRefCopy[trayIndex].grilled = true;
      setProductionTray(trayRefCopy);
    }, 100000);
    const trayArrayCopy: [ProductionTray, ProductionTray] =
      productionTray.slice() as [ProductionTray, ProductionTray];
    trayArrayCopy[trayIndex].timerId = timerId;
    setProductionTray(trayArrayCopy);
  }

  // BUILDING FRIES PORTION

  function handleClickBuildingFriesPortion(element: Size | ProductionTray) {
    const portionCopy: FriesBuilder = structuredClone(portion);

    if ("capacity" in element) {
      portionCopy.size = element;
    } else {
      if (element.quantity > 0) {
        portionCopy.ingredient = element.productName;
      } else {
        displayNoStock();
      }
    }

    setPortion(portionCopy);
  }

  function handleClickSetBuildingPortionInReadyPortionFries() {
    // check if portion have all informations
    if (
      portion.ingredient !== emptyFries &&
      portion.size !== emptyFries &&
      typeof portion.size !== "string"
    ) {
      // build new fries

      let sizeGender: string = "e";
      if (portion.size.name === size[1].name) {
        sizeGender = "ne";
      }

      const recipeFrie: FriesSide = {
        side: `${portion.size.name}${sizeGender} ${portion.ingredient}`,
        grilled: false,
      };

      const finalFrie: FinalProductSide = {
        name: recipeFrie.side,
        ingredient: recipeFrie,
        size: portion.size.capacity,
        timeId: 0,
        dateId: 0,
        price: 0,
        type: "fries",
        side: "type",
      };

      setReadyPortionFries([...readyPortionFries, finalFrie]);

      // clear portion
      const clearPortion: FriesBuilder = structuredClone(portion);
      clearPortion.ingredient = emptyFries;
      clearPortion.size = emptyFries;
      setPortion(clearPortion);

      // remove from ingredient
      const trayArrayCopy: [ProductionTray, ProductionTray] =
        productionTray.slice() as [ProductionTray, ProductionTray];
      const indexIngredient: number = trayArrayCopy.findIndex(
        (ingredient) => ingredient.productName === portion.ingredient
      );

      trayArrayCopy[indexIngredient].quantity =
        trayArrayCopy[indexIngredient].quantity - 1;

      // clear time out if it's the last ingredient
      if (trayArrayCopy[indexIngredient].quantity === 0) {
        clearTimeout(trayArrayCopy[indexIngredient].timerId);
        trayArrayCopy[indexIngredient].timerId = 0;
      }
      setProductionTray(trayArrayCopy);
    } else {
      displayPortionNotComplete();
    }
  }

  // DELETE GRILLED TRAY & FRYERS

  function handleClickDeleteGrilledTray(trayIndex) {
    const trayArrayCopy: [ProductionTray, ProductionTray] =
      productionTray.slice() as [ProductionTray, ProductionTray];
    trayArrayCopy[trayIndex].grilled = false;
    trayArrayCopy[trayIndex].quantity = 0;
    trayArrayCopy[trayIndex].timerId = 0;

    setProductionTray(trayArrayCopy);
  }

  function handleClickDeleteGrilledFryer(friesDateId: number) {
    const indexGrilledFries: number = grilledFries.findIndex(
      (fries) => fries.dateId === friesDateId
    );
    if (indexGrilledFries !== -1) {
      const grilledFriesCopy: Ingredient[] = grilledFries.slice();
      grilledFriesCopy.splice(indexGrilledFries, 1);
      setGrilledFries(grilledFriesCopy);
    }
  }

  return (
    <div id="friesComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          FRITE
        </button>
      </div>
      <div id="friesPageContent">
        <h3>Pret</h3>
        {productionTray.map((tray) => (
          <button key={tray.productName} className="readyButton">
            {tray.productName} : {tray.quantity}
          </button>
        ))}
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
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <br />
          <div id="friesModalContent">
            <div id="buildingAndReadFries">
              <div id="buildingFries">
                <h3>Fabrication des portions</h3>
                <div>
                  {productionTray.map((tray: ProductionTray, index: number) => (
                    <button
                      key={tray.productName}
                      onClick={
                        tray.grilled === true
                          ? () => handleClickDeleteGrilledTray(index)
                          : () => handleClickBuildingFriesPortion(tray)
                      }
                      className={
                        tray.grilled === true
                          ? "grilledButton buildingFriesButton"
                          : "readyButton buildingFriesButton"
                      }
                    >
                      {tray.productName} : {tray.quantity}
                    </button>
                  ))}
                </div>
                <div>
                  {size.map((size: Size) => (
                    <button
                      key={size.name}
                      onClick={() => handleClickBuildingFriesPortion(size)}
                      className="neutralButton buildingFriesButton"
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleClickSetBuildingPortionInReadyPortionFries}
                  className="neutralButton buildingFriesButton"
                >
                  Fabriquer
                </button>
              </div>
              <br />
              <hr />
              <div>
                <h3>Pret</h3>
                {readyPortionFries.map((readyPortion, i) => (
                  <button key={i} className="readyButton buildingFriesButton">
                    {readyPortion.ingredient.side}
                  </button>
                ))}
                {emptyPlaceTray.map((place, i) => (
                  <button key={i} className="neutralButton buildingFriesButton">
                    {place}
                  </button>
                ))}
              </div>
            </div>
            <hr />
            <div id="cookingAndStockFries">
              <div>
                <h3>Cuisson</h3>
                <div>
                  {fries.map((ingredient) => (
                    <button
                      key={ingredient.ingredientName}
                      onClick={() => handleClickCookingRawFries(ingredient)}
                      className="neutralButton cookingFriesButton"
                    >
                      {ingredient.ingredientName}
                    </button>
                  ))}
                </div>
                <div>
                  {grilledFries.map((fries) => (
                    <button
                      key={fries.dateId}
                      onClick={() =>
                        handleClickDeleteGrilledFryer(fries.dateId)
                      }
                      className="grilledButton cookingFriesButton"
                    >
                      {fries.ingredientName}
                    </button>
                  ))}
                  {readyFries.map((fries) => (
                    <button
                      key={fries.dateId}
                      onClick={() => handleClickSetReadyFriesInFriesTray(fries)}
                      className="readyButton cookingFriesButton"
                    >
                      {fries.ingredientName}
                    </button>
                  ))}
                  {cookingFries.map((fries) => (
                    <button
                      key={fries.dateId}
                      className="cookingButton cookingFriesButton"
                    >
                      {fries.ingredientName}
                    </button>
                  ))}
                  {emptyPlaceFries.map((place, i) => (
                    <button
                      key={i}
                      className="neutralButton cookingFriesButton"
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </div>
              <br />
              <hr />
              <div>
                <h3>Stocks</h3>
                <ul>
                  {stocksRawsIngredients[
                    indexRawGlobalStock
                  ].productionArray.map((friesStock) => (
                    <li key={friesStock.ingredientName}>
                      {friesStock.ingredientName} : {friesStock.currentStocks}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />
            <div id="ordersFries">
              <h3>Commandes</h3>
              <div id="ordersFriesArray">
                {orderTab}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fries;
