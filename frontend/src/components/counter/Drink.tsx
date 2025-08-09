import React, { useEffect, useRef, useState, useContext } from "react";
import {
  setActionModal,
  updateEmptyPlace,
} from "../../functions/generalsFuctions";
import "../../style/Drink.css";
import {
  FinalProductDrink,
  Ingredient,
} from "../../interfaces/produitsInterfaces";
import { BuildingDrink } from "../../interfaces/compositionElementsInterfaces";
import { size, drink } from "../../elements/ingredients";
import {
  StocksRawsIngredientsContext,
  SetStocksRawsIngredientsContext,
} from "../../context/StockRawsContext";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
  restoreToStockOfProduct,
} from "../../functions/inventoryManagementFunctions";
import {
  displayFlavourNotComplete,
  displayNoStock,
} from "../../functions/toastFunctions";
import { Slide, ToastContainer } from "react-toastify";
import { allDrinks } from "../../elements/produits";

function Drink({
  readyDrink,
  setReadyDrink,
}: {
  readyDrink: FinalProductDrink[];
  setReadyDrink: React.Dispatch<React.SetStateAction<FinalProductDrink[]>>;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  // STOCKS CONTEXT
  const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);
  const setStocksRawsIngredients = useContext(SetStocksRawsIngredientsContext);

  //TOOLS VARIABLES
  const limitSizeDrink: number = 10;
  const stockGlobalIndex: number = 9;
  const emptyDrink: string = "Vide";
  const emptyDrinkObject: BuildingDrink = {
    size: emptyDrink,
    flavour: emptyDrink,
  };

  // BUILDING DRINK VARIABLE
  const [cookingDrink, setCookingDrink] = useState<FinalProductDrink[]>([]);
  const [buildingDrink, setBuildingDrink] =
    useState<BuildingDrink>(emptyDrinkObject);
  const [emptyPlace, setEmptyPlace] = useState<string[]>([]);
  const cookingDrinkRef = useRef<FinalProductDrink[]>([]);
  const readyDrinkRef = useRef<FinalProductDrink[]>([]);

  // UPDATE REF

  useEffect(() => {
    cookingDrinkRef.current = cookingDrink;
  }, [cookingDrink]);

  useEffect(() => {
    readyDrinkRef.current = readyDrink;
  }, [readyDrink]);

  // UPDATE EMPTY PLACE

  useEffect(() => {
    const takenPlaces: number = cookingDrink.length + readyDrink.length;
    updateEmptyPlace(takenPlaces, limitSizeDrink, setEmptyPlace, emptyDrink);
  }, [cookingDrink, readyDrink]);

  // REMOVE DRINK FUNCTION

  function removeDrinkFromArray(drink: FinalProductDrink) {
    const arrayCopy: FinalProductDrink[] = cookingDrink.slice();
    const drinkIndex: number = arrayCopy.findIndex(
      (drinkCopy) => drinkCopy.dateId === drink.dateId
    );
    if (drinkIndex !== -1) {
      arrayCopy.splice(drinkIndex, 1);
      setCookingDrink(arrayCopy);
    }
  }

  function handleClickRemoveForTrash(drink: FinalProductDrink) {
    const arrayCopy: FinalProductDrink[] = readyDrink.slice();
    const drinkIndex: number = arrayCopy.findIndex(
      (drinkCopy) => drinkCopy.dateId === drink.dateId
    );
    if (drinkIndex !== -1) {
      arrayCopy.splice(drinkIndex, 1);
      setReadyDrink(arrayCopy);
    }
  }

  // BUILDING DRINK

  //ADD INGREDIENT IN THE BUILDING DRINK

  function addNewSizeToBuildingDrink(ingredient: string) {
    const buildingDrinkCopy = structuredClone(buildingDrink);
    buildingDrinkCopy.size = ingredient;
    setBuildingDrink(buildingDrinkCopy);
  }

  function addNewFlavourInBuildingDrink(ingredient: string): string {
    const buildingDrinkCopy = structuredClone(buildingDrink);
    const oldIngredient: string = buildingDrinkCopy.flavour;
    buildingDrinkCopy.flavour = ingredient;
    setBuildingDrink(buildingDrinkCopy);
    return oldIngredient;
  }

  function updateStock(ingredient: string, move: string) {
    let ingredientObject: Ingredient | undefined = drink.find(
      (drink) => drink.ingredientName === ingredient
    );
    if (ingredientObject !== undefined) {
      if (move === "remove") {
        ingredientObject = removeToStockOfProduct(ingredientObject);
      } else {
        ingredientObject = restoreToStockOfProduct(ingredientObject);
      }
      const updatedArray = remplaceOldProductByUpdateProduct(
        stocksRawsIngredients[stockGlobalIndex].sectionName,
        ingredientObject
      );
      if (setStocksRawsIngredients !== undefined) {
        setStocksRawsIngredients(updatedArray);
      }
    }
  }

  // START ADD NEW INGREDIENT
  function buildNewDrink(ingredient: string, stock: number) {
    //identifiy type of ingredient, add new and recover old
    if (size.find((size) => size.name === ingredient) !== undefined) {
      addNewSizeToBuildingDrink(ingredient);
    } else {
      // check if have stock for this flavour
      if (stock > 0) {
        const oldIngredient: string = addNewFlavourInBuildingDrink(ingredient);
        updateStock(ingredient, "remove");
        updateStock(oldIngredient, "restore");
      } else {
        displayNoStock();
      }
    }
  }

  function startCookingTimer(drink: FinalProductDrink) {
    setTimeout(() => {
      setReadyDrink([...readyDrinkRef.current, drink]);
      removeDrinkFromArray(drink);
    }, 1000);
  }

  // ADD BUILDING DRINK IN COOKING DRINK
  function handleClickFinishBuilding() {
    if (
      buildingDrink.flavour !== emptyDrink &&
      buildingDrink.size !== emptyDrink
    ) {
      let flavour = `${buildingDrink.size} ${buildingDrink.flavour}`;
      const drinkAssetIndex: number = allDrinks.findIndex(
        (asset) => asset.ingredient.flavour === flavour
      );
      if (drinkAssetIndex !== -1) {
        if (buildingDrink.size === size[1].name) {
          flavour = `${buildingDrink.size}ne ${buildingDrink.flavour}`;
        } else {
          flavour = `${buildingDrink.size}e ${buildingDrink.flavour}`;
        }
        const drinkAssetCopy: FinalProductDrink = structuredClone(
          allDrinks[drinkAssetIndex]
        );
        drinkAssetCopy.dateId = Date.now();
        drinkAssetCopy.name = flavour;
        setCookingDrink([...cookingDrink, drinkAssetCopy]);
        setBuildingDrink(emptyDrinkObject);
        startCookingTimer(drinkAssetCopy);
      }
    } else {
      displayFlavourNotComplete();
    }
  }

  return (
    <div id="drinkComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Boisson
        </button>
      </div>
      <div id="drinkPageContent">
        <h3>Pret</h3>
        <ul>
          {readyDrink.map((drink, i: number) => (
            <li key={drink.dateId + i}>{drink.name}</li>
          ))}
          {emptyPlace.map((drink, i) => (
            <button key={i}>{drink}</button>
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
            <h2>Boisson</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="drinkModalContent">
            <div>
              <h3>Pret</h3>
            </div>
            {readyDrink.map((drink, i) => (
              <button
                key={drink.dateId + i}
                style={{ color: "blue" }}
                onClick={() => handleClickRemoveForTrash(drink)}
              >
                {drink.name}
              </button>
            ))}
            {cookingDrink.map((drink, i) => (
              <button key={drink.dateId + i}>{drink.name}</button>
            ))}
            {emptyPlace.map((drink, i) => (
              <button key={i}>{drink}</button>
            ))}
            <div>
              <h3>Preparation</h3>
              <h4>Saveur</h4>
              {stocksRawsIngredients[stockGlobalIndex].productionArray.map(
                (drink) => (
                  <button
                    key={drink.ingredientName}
                    onClick={() =>
                      buildNewDrink(drink.ingredientName, drink.currentStocks)
                    }
                  >
                    {drink.ingredientName}
                  </button>
                )
              )}
              <h4>Taille</h4>
              {size.map((size) => (
                <button
                  key={size.name}
                  onClick={() => buildNewDrink(size.name, 0)}
                >
                  {size.name}
                </button>
              ))}
              <ul>
                <li>Taille : {buildingDrink.size}</li>
                <li>Saveur : {buildingDrink.flavour}</li>
              </ul>
              <button onClick={handleClickFinishBuilding}>Preparer</button>
            </div>
            <div>
              <div>
                <h3>Commandes</h3>
              </div>
              <div>
                <h3>Stocks</h3>
                <ul>
                  {stocksRawsIngredients[stockGlobalIndex].productionArray.map(
                    (ingredient) => (
                      <li key={ingredient.ingredientName}>
                        {ingredient.ingredientName} : {ingredient.currentStocks}
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

export default Drink;
