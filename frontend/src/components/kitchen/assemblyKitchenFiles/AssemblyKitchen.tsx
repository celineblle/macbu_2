import React, { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { setActionModal } from "../../../functions/generalsFuctions";
import "../../../style/AssemblyKitchen.css";
import { AvailableMeat } from "../../../interfaces/compositionElementsInterfaces";
import {
  Burger,
  FinalProductBurger,
} from "../../../interfaces/produitsInterfaces";
import { allBurgers } from "../../../elements/produits";
import BuildingBurgerComponent from "./BuildingBurgerComponent";
import BuildingBurgerFonctions from "./BuildingBurgerFonctions";
import TabsCuisineComponent from "./TabsCuisineComponent";
import { displayNoPlace } from "../../../functions/toastFunctions";
import GetReadyBurger from "./GetReadyBurger";
import {
  emptyBurgerObject,
  limitSizeBurgerTray,
  emptyBurger,
} from "./assemblyKitchenTools";

function AssemblyKitchen({
  availableFrying,
  setAvailableFrying,
  availableGrill,
  setAvailableGrill,
  readyBurger,
  setReadyBurger,
}: {
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

  // BUILDING BURGER VARIABLES
  const [waitingArrayBurger, setWaitingArrayBurger] = useState<
    FinalProductBurger[]
  >([]);
  const [buildingBurger, setBuildingBurger] =
    useState<FinalProductBurger>(emptyBurgerObject);

  // CALL FOR BUILDING BURGER FONCTIONS
  const {
    addNewIngredientInBuildingBurger,
    handleClickRemoveIngredientFromBuildingBurgerForGlobalStock,
  } = BuildingBurgerFonctions({
    buildingBurger,
    setBuildingBurger,
    availableFrying,
    setAvailableFrying,
    availableGrill,
    setAvailableGrill,
  });

  //CALL FOR GET READY BURGER FONCTION

  const { handleClickSetReadyBurger } = GetReadyBurger({
    buildingBurger,
    setBuildingBurger,
    readyBurger,
    setReadyBurger,
  });

  // BURGER STAND BY FONCTIONS
  function handleClickStandByBurger() {
    //set in the array
    if (waitingArrayBurger.length < limitSizeBurgerTray) {
      setWaitingArrayBurger([...waitingArrayBurger, buildingBurger]);
      // reset building burger
      setBuildingBurger(emptyBurgerObject);
    } else {
      displayNoPlace();
    }
  }

  function handleClickTakeWaitingBurger(burgerId: number) {
    const waitingArray: FinalProductBurger[] = waitingArrayBurger.slice();
    setBuildingBurger(waitingArray[burgerId]);

    waitingArray.splice(burgerId, 1);
    setWaitingArrayBurger(waitingArray);
  }

  // THROW BURGER ON CLICK
  function throwBurger(burgerIndex: number) {
    const readyBurgerCopy: FinalProductBurger[] = readyBurger.slice();
    readyBurgerCopy.splice(burgerIndex, 1);
    setReadyBurger(readyBurgerCopy);
  }

  return (
    <div id="assemblyKitchenComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          CUISINE
        </button>
      </div>
      <div id="assemblyKitchenPageContent">
        <div>
          <h3>Burger prêt</h3>
          <ul className="burgerArrayFrontPage">
            {readyBurger.map((burger, i) => (
              <li key={i} className="readyOrder readyBurgerArrayFrontPage">
                {burger.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Burger en attente</h3>
          <ul className="burgerArrayFrontPage">
            {waitingArrayBurger.map((burger, i) => (
              <li key={i} className="cookingOrder readyBurgerArrayFrontPage">
                {burger.name}
              </li>
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
            <div id="buildingBurger">
              <TabsCuisineComponent
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                addNewIngredientInBuildingBurger={
                  addNewIngredientInBuildingBurger
                }
                availableGrill={availableGrill}
                availableFrying={availableFrying}
              />
              <div>
                <br />
                <div id="inProgressBurgerButton">
                  <h3>Burger en cours</h3>
                  <div>
                    <button
                      onClick={handleClickSetReadyBurger}
                      className="neutralButton"
                    >
                      Pret
                    </button>
                    <button
                      onClick={handleClickStandByBurger}
                      className="neutralButton"
                    >
                      Mettre en attente
                    </button>
                  </div>
                </div>
                <BuildingBurgerComponent
                  buildingBurger={buildingBurger}
                  handleClickRemoveIngredientFromBuildingBurgerForGlobalStock={
                    handleClickRemoveIngredientFromBuildingBurgerForGlobalStock
                  }
                />
              </div>
              <div>
                <h3>Recettes</h3>
                <ul className="buildingBurgerAndRecipeComponent">
                  {allBurgers.map((burger: FinalProductBurger) => (
                    <li key={burger.name} className="recipeBurgerLi">
                      {burger.name} :{"  "}
                      {burger.ingredient[activeTab as keyof Burger] !==
                      undefined ? (
                        typeof burger.ingredient[activeTab] === "string" ? (
                          <p>
                            {"  "}
                            {burger.ingredient[activeTab]}
                          </p>
                        ) : (
                          burger.ingredient[activeTab].map((ingredient) => (
                            <p key={ingredient}>
                              {"  "}
                              {ingredient}
                              {","}
                            </p>
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
            <hr />
            <div id="standByBurger">
              <div>
                <h3>Commandes</h3>
                <div id="burgerOrder"></div>
              </div>
              <div>
                <h3>Burgers prets</h3>
                <div id="readyBurgerArray">
                  {readyBurger.map((burger, i) => (
                    <button
                      key={i}
                      onClick={() => throwBurger(i)}
                      className="readyOrder"
                    >
                      {burger.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3>Burgers en attente</h3>
                <div id="waitingBurgerArray">
                  {waitingArrayBurger.map((burger: FinalProductBurger, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickTakeWaitingBurger(i)}
                      className="cookingOrder"
                    >
                      <ul>
                        {burger.ingredient.bread !== emptyBurger && (
                          <li>{burger.ingredient.bread}</li>
                        )}
                        {burger.ingredient.meat !== emptyBurger && (
                          <li>{burger.ingredient.meat}</li>
                        )}
                        {burger.ingredient.cheese?.length !== 0 &&
                          burger.ingredient.cheese !== undefined &&
                          burger.ingredient.cheese.map((ingredient) => (
                            <li key={ingredient}>{ingredient} </li>
                          ))}
                        {burger.ingredient.sauce?.length !== 0 &&
                          burger.ingredient.sauce !== undefined &&
                          burger.ingredient.sauce.map((sauce) => (
                            <li key={sauce}>{sauce} </li>
                          ))}
                        {burger.ingredient.variousIngredient?.length !== 0 &&
                          burger.ingredient.variousIngredient !== undefined &&
                          burger.ingredient.variousIngredient.map(
                            (ingredient) => (
                              <li key={ingredient}>{ingredient} </li>
                            )
                          )}
                      </ul>
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
