import React, { useEffect, useRef, useState, useContext } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/IceCream.css";
import {
  FinalProductDessert,
  Ingredient,
} from "../../interfaces/produitsInterfaces";
import { updateEmptyPlace } from "../../functions/generalsFuctions";
import { iceCream } from "../../elements/ingredients";
import {
  StocksRawsIngredientsContext,
  SetStocksRawsIngredientsContext,
} from "../../context/StockRawsContext";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
  restoreToStockOfProduct,
} from "../../functions/inventoryManagementFunctions";
import { displayToppingNotComplete } from "../../functions/toastFunctions";
import { Slide, ToastContainer } from "react-toastify";
import { OrdersToPrepareContext } from "../../context/OrderContext";
import ComponentOrder from "../ComponentOrder";

function IceCreamComponent({
  readyIceCream,
  setReadyIceCream,
}: {
  readyIceCream: FinalProductDessert[];
  setReadyIceCream: React.Dispatch<React.SetStateAction<FinalProductDessert[]>>;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  //STOCKS CONTEXT
  const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);
  const setStocksRawsIngredients = useContext(SetStocksRawsIngredientsContext);

  //ORDER CONTEXT
  const ordersToPrepare = useContext(OrdersToPrepareContext);

  //TOOL VARIABLES
  const stockRawIndex: number = 7;
  const limiteSizeShelf: number = 20;
  const coulisIdentifier: string = "Coulis";
  const eclatsIndentifier: string = "Eclats";
  const emptyIceCream: string = "Vide";
  const emptyIceCreamObject: FinalProductDessert = {
    name: "Building ice cream",
    ingredient: {
      coulisTopping: [emptyIceCream, emptyIceCream],
      melted: false,
    },
    size: 0,
    timeId: 0,
    dateId: 0,
    price: 0,
    type: "glace",
    dessert: "type",
  };

  // BUILDING ICE CREAM VARIABLES
  const [cookingIceCream, setCookingIceCream] = useState<FinalProductDessert[]>(
    []
  );
  const [meltedIceCream, setMeltedIceCream] = useState<FinalProductDessert[]>(
    []
  );
  const [buildingIceCream, setBuildingIceCream] =
    useState<FinalProductDessert>(emptyIceCreamObject);
  const [emptyPlace, setEmptyPlace] = useState<string[]>([]);

  const cookingIceCreamRef = useRef<FinalProductDessert[]>([]);
  const readyIceCreamRef = useRef<FinalProductDessert[]>([]);
  const meltedIceCreamRef = useRef<FinalProductDessert[]>([]);

  // UPDATE REFS

  useEffect(() => {
    cookingIceCreamRef.current = cookingIceCream;
  }, [cookingIceCream]);

  useEffect(() => {
    readyIceCreamRef.current = readyIceCream;
  }, [readyIceCream]);

  useEffect(() => {
    meltedIceCreamRef.current = meltedIceCream;
  }, [meltedIceCream]);

  // GET ICE CREAM ORDERS
  const [iceCreamOrders, setIceCreamOrders] = useState<[number, string[]][]>(
    []
  );
  function getIceCreamOrders() {
    const allIceCreamOrder: [number, string[]][] = [];
    for (let i = 0; i < ordersToPrepare.length; i++) {
      const uniqueOrder: [number, string[]] = [i + 1, []];
      for (let j = 0; j < ordersToPrepare[i].products.length; j++) {
        const currentProduct = ordersToPrepare[i].products[j];
        if (
          "sandwich" in currentProduct === false &&
          "coulisTopping" in currentProduct.ingredient === true
        ) {
          uniqueOrder[1].push(currentProduct.name);
        }
      }
      if (uniqueOrder[1].length > 0) {
        allIceCreamOrder.push(uniqueOrder);
      }
    }
    setIceCreamOrders(allIceCreamOrder);
  }

  useEffect(() => {
    getIceCreamOrders();
  }, [ordersToPrepare]);

  // ORDER JSX COMPONENT
  const orderTab = ComponentOrder(iceCreamOrders);


  // UPDATE EMPTY PLACE

  useEffect(() => {
    const takenPlaces: number =
      cookingIceCream.length + readyIceCream.length + meltedIceCream.length;
    updateEmptyPlace(
      takenPlaces,
      limiteSizeShelf,
      setEmptyPlace,
      emptyIceCream
    );
  }, [cookingIceCream, readyIceCream, meltedIceCream]);

  // TOOLS FUNCTIONS
  function removeIceCreamFromOldArray(
    oldArray: React.RefObject<FinalProductDessert[]>,
    movingIce: FinalProductDessert,
    oldArraySetter: React.Dispatch<React.SetStateAction<FinalProductDessert[]>>
  ) {
    const oldArrayCopy: FinalProductDessert[] = oldArray.current.slice();
    const movingIceIndex: number = oldArrayCopy.findIndex(
      (ice) => movingIce.dateId === ice.dateId
    );
    if (movingIceIndex !== -1) {
      oldArrayCopy.splice(movingIceIndex, 1);
      oldArraySetter(oldArrayCopy);
    }
  }

  // ADD NEW ICE CREAM COOKING ARRAY

  // UPDATE TOPPING INGREDIENT IN THE BUILDING ICE CREAM
  function remplaceIngredientInBuildingIceCream(
    ingredient: string
  ): string | undefined {
    const buildingIceCreamCopy = structuredClone(buildingIceCream);
    let oldIngredient: string = emptyIceCream;

    // identify type of toping, save old topping and set new one
    if ("coulisTopping" in buildingIceCreamCopy.ingredient) {
      if (ingredient.includes(coulisIdentifier)) {
        if (
          buildingIceCreamCopy.ingredient.coulisTopping[0] !== emptyIceCream
        ) {
          oldIngredient = buildingIceCreamCopy.ingredient.coulisTopping[0];
        }
        buildingIceCreamCopy.ingredient.coulisTopping.splice(0, 1, ingredient);
      } else {
        if (
          buildingIceCreamCopy.ingredient.coulisTopping[1] !== emptyIceCream
        ) {
          oldIngredient = buildingIceCreamCopy.ingredient.coulisTopping[1];
        }
        buildingIceCreamCopy.ingredient.coulisTopping.splice(1, 1, ingredient);
      }
      setBuildingIceCream(buildingIceCreamCopy);
      return oldIngredient;
    }
  }

  // UPDATE STOCK (RESTORE / REMOVE) IN THE GLOBALS RAWS STOCKS
  function changeIngredientInStock(ingredient: string, action: string) {
    const ingredientCopy: Ingredient | undefined = iceCream.find(
      (ice) => ice.ingredientName === ingredient
    );
    if (ingredientCopy !== undefined) {
      let updatedIngredient: Ingredient = ingredientCopy;
      if (action === "remove") {
        updatedIngredient = removeToStockOfProduct(ingredientCopy);
      } else {
        updatedIngredient = restoreToStockOfProduct(ingredientCopy);
      }
      const updatedStockArray = remplaceOldProductByUpdateProduct(
        stocksRawsIngredients[stockRawIndex].sectionName,
        updatedIngredient
      );
      if (setStocksRawsIngredients !== undefined) {
        setStocksRawsIngredients(updatedStockArray);
      }
    }
  }

  // START FUNCTION FOR ADD NEW INGREDIENT IN THE BUILDING ICE CREAM
  function handleCLickBuildingIceCream(ingredient: string) {
    const oldIngredient: string | undefined =
      remplaceIngredientInBuildingIceCream(ingredient);

    // remove quantity in global stock of new topping
    changeIngredientInStock(ingredient, "remove");
    // restore quantity of old topping
    if (oldIngredient !== undefined) {
      changeIngredientInStock(oldIngredient, "restore");
    }
  }

  // STAND BY TIMER
  function startMeltingIceCreamTimer(meltingIce: FinalProductDessert) {
    const timerId: number = setTimeout(() => {
      setMeltedIceCream([...meltedIceCreamRef.current, meltingIce]);
      removeIceCreamFromOldArray(
        readyIceCreamRef,
        meltingIce,
        setReadyIceCream
      );
    }, 2000);
    return timerId;
  }

  // COOKING TIMER
  function startCookingTimer(cookingIce: FinalProductDessert) {
    setTimeout(() => {
      // start melting ice timer & save id for stop the melting
      const timerId = startMeltingIceCreamTimer(cookingIce);
      cookingIce.timeId = timerId;
      // add ice cream in ready array
      setReadyIceCream([...readyIceCreamRef.current, cookingIce]);
      // remove the ice cream of cooking array
      removeIceCreamFromOldArray(
        cookingIceCreamRef,
        cookingIce,
        setCookingIceCream
      );
    }, 1000);
  }

  //ADD BUILDING ICE CREAM TO COOKING ARRAY
  function handleClickAddBuildingIceCreamToCookingArray() {
    // if building ice cream ingredient is complete, add in the cooking array
    if (
      "coulisTopping" in buildingIceCream.ingredient &&
      buildingIceCream.ingredient.coulisTopping[0] !== emptyIceCream &&
      buildingIceCream.ingredient.coulisTopping[1] !== emptyIceCream
    ) {
      const buildingIceCreamCopy = structuredClone(buildingIceCream);

      // add unique id to the new ice cream
      buildingIceCreamCopy.dateId = Date.now();
      setCookingIceCream([...cookingIceCreamRef.current, buildingIceCreamCopy]);

      // start cooking timer
      startCookingTimer(buildingIceCreamCopy);

      setBuildingIceCream(emptyIceCreamObject);
    } else {
      displayToppingNotComplete();
    }
  }

  // CLEAR ON CLICK UNIQUE ICE FROM THE MELTED ARRAY
  function throwAwayOneMeltedIce(ice: FinalProductDessert) {
    const meltedArrayCopy: FinalProductDessert[] = meltedIceCream.slice();
    const meltedIceIndex: number = meltedArrayCopy.findIndex(
      (meltedIce) => meltedIce.dateId === ice.dateId
    );
    if (meltedIceIndex !== -1) {
      meltedArrayCopy.splice(meltedIceIndex, 1);
      setMeltedIceCream(meltedArrayCopy);
    }
  }

  return (
    <div id="iceCreamComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          GLACE
        </button>
      </div>
      <div id="iceCreamPageContent">
        <h3>Pret</h3>
        <ul className="readyProductArrayFrontPage">
          {readyIceCream.map(
            (ice: FinalProductDessert, i) =>
              "coulisTopping" in ice.ingredient && (
                <li key={ice.dateId + i} className="readyButton frontPageLi">
                  {ice.ingredient.coulisTopping[0]}{" "}
                  {ice.ingredient.coulisTopping[1]}
                </li>
              )
          )}
          {emptyPlace.map((ice, i) => (
            <li key={i} className="neutralButton frontPageLi">
              {ice}
            </li>
          ))}
        </ul>
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
            <h2>Glace</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="iceCreamModalContent">
            <div id="readyAndBuildIceCream">
              <div id="cookingIceCream">
                <h3>Pret</h3>
                <div id="cookingArrayIceCream">
                  {meltedIceCream.map(
                    (ice, i) =>
                      "coulisTopping" in ice.ingredient && (
                        <button
                          onClick={() => throwAwayOneMeltedIce(ice)}
                          key={ice.dateId + i}
                          className="grilledButton"
                        >
                          {ice.ingredient.coulisTopping[0]}{" "}
                          {ice.ingredient.coulisTopping[1]}
                        </button>
                      )
                  )}
                  {readyIceCream.map(
                    (ice, i) =>
                      "coulisTopping" in ice.ingredient && (
                        <button key={ice.dateId + i} className="readyButton">
                          {ice.ingredient.coulisTopping[0]}{" "}
                          {ice.ingredient.coulisTopping[1]}
                        </button>
                      )
                  )}
                  {cookingIceCream.map(
                    (ice, i) =>
                      "coulisTopping" in ice.ingredient && (
                        <button key={ice.dateId + i} className="cookingButton">
                          {ice.ingredient.coulisTopping[0]}{" "}
                          {ice.ingredient.coulisTopping[1]}
                        </button>
                      )
                  )}
                  {emptyPlace.map((ice, i) => (
                    <button key={i} className="neutralButton">
                      {ice}
                    </button>
                  ))}
                </div>
              </div>
              <hr />
              <div id="buildingIceCream">
                <h3>Preparation</h3>
                <h4>Coulis</h4>
                {iceCream.map(
                  (ice) =>
                    ice.ingredientName.includes(coulisIdentifier) === true && (
                      <button
                        key={ice.ingredientName}
                        onClick={() =>
                          handleCLickBuildingIceCream(ice.ingredientName)
                        }
                        className="neutralButton"
                      >
                        {ice.ingredientName}
                      </button>
                    )
                )}
                <h4>Topping</h4>
                {iceCream.map(
                  (ice) =>
                    ice.ingredientName.includes(eclatsIndentifier) === true && (
                      <button
                        key={ice.ingredientName}
                        onClick={() =>
                          handleCLickBuildingIceCream(ice.ingredientName)
                        }
                        className="neutralButton"
                      >
                        {ice.ingredientName}
                      </button>
                    )
                )}
                <h4>Glace</h4>
                {"coulisTopping" in buildingIceCream.ingredient && (
                  <ul>
                    <li>
                      Coulis : {buildingIceCream.ingredient.coulisTopping[0]}
                    </li>
                    <li>
                      Eclats : {buildingIceCream.ingredient.coulisTopping[1]}
                    </li>
                  </ul>
                )}
                <button
                  onClick={handleClickAddBuildingIceCreamToCookingArray}
                  className="neutralButton"
                >
                  Preparer
                </button>
              </div>
            </div>
            <hr />
            <div id="ordersAndFridgeIceCream">
              <div id="orderIceCream">
                <h3>Commandes</h3>
                <div id="orderArrayIceCream">
                  {orderTab}
                </div>
              </div>
              <hr />
              <div id="fridgeIceCream">
                <h3>Stocks</h3>
                <ul>
                  {stocksRawsIngredients[stockRawIndex].productionArray.map(
                    (iceStock) => (
                      <li key={iceStock.ingredientName}>
                        {iceStock.ingredientName} : {iceStock.currentStocks}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IceCreamComponent;
