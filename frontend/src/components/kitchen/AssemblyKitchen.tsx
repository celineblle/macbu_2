import React, { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import {
  setActionModal,
} from "../../functions/generalsFuctions";
import "../../style/AssemblyKitchen.css";
import {
  AvailableMeat,
  SectionRawIngredients,
} from "../../interfaces/compositionElementsInterfaces";
import {
  Burger,
  FinalProductBurger,
} from "../../interfaces/produitsInterfaces";
import { allBurgers } from "../../elements/produits";
import { tabIngredient } from "./assemblyKitchenTools";
import { emptyBurger } from "./assemblyKitchenTools";
import BuildingBurgerComponent from "./BuildingBurgerComponent";
import BuildingBurgerFonctions from "./BuildingBurgerFonctions";

function AssemblyKitchen({
  stocksRawsIngredients,
  setStocksRawsIngredients,
  availableFrying,
  setAvailableFrying,
  availableGrill,
  setAvailableGrill,
  readyBurger,
  setReadyBurger,
}: {
  stocksRawsIngredients: SectionRawIngredients[];
  setStocksRawsIngredients: React.Dispatch<
    React.SetStateAction<SectionRawIngredients[]>
  >;
  availableFrying: AvailableMeat[];
  setAvailableFrying: React.Dispatch<React.SetStateAction<AvailableMeat[]>>;
  availableGrill: AvailableMeat[];
  setAvailableGrill: React.Dispatch<React.SetStateAction<AvailableMeat[]>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
}) {
  // MODAL & TABS
  const [toggleModal, setToggleModal] = useState(false);
  const [activeTab, setActiveTab] = useState("bread");

  // LIMIT & PLACE HOLDER VARIABLES
  const limitSizeBurgerTray: number = 4;
  const customBurgerTitle: string = "Recette personnelle";

  // BUILDING BURGER VARIABLES
  const [waitingArrayBurger, setWaitingArrayBurger] = useState<
    FinalProductBurger[]
  >([]);
  const [buildingBurger, setBuildingBurger] = useState<FinalProductBurger>({
    name: "waitingBurger",
    ingredient: {
      bread: emptyBurger,
      meat: emptyBurger,
      cheese: [],
      variousIngredient: [],
      sauce: [],
    },
    size: 0,
    price: 0,
    type: "burger",
  });

  const {
    addNewIngredientInBuildingBurger,
    handleClickRemoveIngredientFromBuildingBurgerForGlobalStock,
  } = BuildingBurgerFonctions({
    stocksRawsIngredients,
    setStocksRawsIngredients,
    buildingBurger,
    setBuildingBurger,
    availableFrying,
    setAvailableFrying,
    availableGrill,
    setAvailableGrill,
  });

  return (
    <div id="assemblyKitchenComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Cuisine
        </button>
      </div>
      <div id="assemblyKitchenPageContent">
        <div>
          <h3>Pret</h3>
          <ul>
            {readyBurger.map((burger) => (
              <li>{burger.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>En attente</h3>
          <ul>
            {waitingArrayBurger.map((burger) => (
              <li>{burger.name}</li>
            ))}
          </ul>
        </div>
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
            <h2>Cuisine</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="assemblyKitchenModalContent">
            <div>
              <div>
                <h3>Fabrication</h3>
                <div id="tabs">
                  {tabIngredient.map((tab) => (
                    <button
                      key={tab.tabName}
                      onClick={() => (tab.section, setActiveTab)}
                    >
                      {tab.tabName}
                    </button>
                  ))}
                </div>
                <div>
                  <div
                    className={
                      activeTab === tabIngredient[0].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {stocksRawsIngredients[1].productionArray.map((bread) => (
                      <button
                        key={bread.ingredientName}
                        onClick={() =>
                          addNewIngredientInBuildingBurger(
                            bread,
                            bread.currentStocks
                          )
                        }
                      >
                        {bread.ingredientName} : {bread.currentStocks}
                      </button>
                    ))}
                  </div>
                  <div
                    className={
                      activeTab === tabIngredient[1].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {availableGrill.map((meat) => (
                      <button
                        key={meat.meat.ingredientName}
                        onClick={() =>
                          addNewIngredientInBuildingBurger(
                            meat.meat,
                            meat.quantity
                          )
                        }
                      >
                        {meat.meat.ingredientName} : {meat.quantity}
                      </button>
                    ))}
                  </div>
                  <div
                    className={
                      activeTab === tabIngredient[2].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {availableFrying.map((frying) => (
                      <button
                        key={frying.meat.ingredientName}
                        onClick={() =>
                          addNewIngredientInBuildingBurger(
                            frying.meat,
                            frying.quantity
                          )
                        }
                      >
                        {frying.meat.ingredientName} : {frying.quantity}
                      </button>
                    ))}
                  </div>
                  <div
                    className={
                      activeTab === tabIngredient[3].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {stocksRawsIngredients[3].productionArray.map((cheese) => (
                      <button
                        key={cheese.ingredientName}
                        onClick={() =>
                          addNewIngredientInBuildingBurger(
                            cheese,
                            cheese.currentStocks
                          )
                        }
                      >
                        {cheese.ingredientName} : {cheese.currentStocks}
                      </button>
                    ))}
                  </div>
                  <div
                    className={
                      activeTab === tabIngredient[4].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {stocksRawsIngredients[5].productionArray.map(
                      (ingredient) => (
                        <button
                          key={ingredient.ingredientName}
                          onClick={() =>
                            addNewIngredientInBuildingBurger(
                              ingredient,
                              ingredient.currentStocks
                            )
                          }
                        >
                          {ingredient.ingredientName} :{" "}
                          {ingredient.currentStocks}
                        </button>
                      )
                    )}
                  </div>
                  <div
                    className={
                      activeTab === tabIngredient[5].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {stocksRawsIngredients[2].productionArray.map((sauce) => (
                      <button
                        key={sauce.ingredientName}
                        onClick={() =>
                          addNewIngredientInBuildingBurger(sauce, sauce.currentStocks)
                        }
                      >
                        {sauce.ingredientName} : {sauce.currentStocks}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h3>Burger en cours</h3>
                  <button>Pret</button>
                  <button>Mettre en attente</button>
                </div>
                <BuildingBurgerComponent
                  buildingBurger={buildingBurger}
handleClickRemoveIngredientFromBuildingBurgerForGlobalStock={handleClickRemoveIngredientFromBuildingBurgerForGlobalStock}
                />
              </div>
              <div>
                <h3>Recettes</h3>
                <ul>
                  {allBurgers.map((burger: FinalProductBurger) => (
                    <li key={burger.name}>
                      {burger.name} :{" "}
                      {burger.ingredient[activeTab as keyof Burger] !==
                      undefined ? (
                        typeof burger.ingredient[activeTab] === "string" ? (
                          <p>{burger.ingredient[activeTab]}</p>
                        ) : (
                          burger.ingredient[activeTab].map((ingredient) => (
                            <p key={ingredient}>{ingredient}, </p>
                          ))
                        )
                      ) : (
                        <p>Aucun</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3>Commandes</h3>
              </div>
              <div>
                <h3>Burgers prets</h3>
                <div>
                  {readyBurger.map((burger) => (
                    <button>{burger.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <h3>Burgers en attente</h3>
                </div>

                <div>
                  {waitingArrayBurger.map((burger: FinalProductBurger, i) => (
                    <button key={i}>
                      {burger.ingredient.variousIngredient}
                      {burger.ingredient.sauce}
                      {burger.ingredient.cheese}
                      {burger.ingredient.meat}
                      {burger.ingredient.bread}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyKitchen;
