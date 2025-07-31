import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyKitchen.css";
import {
  AvailableFrying,
  AvailableGrill,
  TabIngredientKitchen,
} from "../../interfaces/compositionElementsInterfaces";
import {
  Burger,
  FinalProductBurger,
  Ingredient,
} from "../../interfaces/produitsInterfaces";
import {
  bread,
  cheese,
  meat,
  sauce,
  variousIngredient,
} from "../../elements/ingredients";
import { allBurgers, burgersName } from "../../elements/produits";

function AssemblyKitchen({
  availableFrying,
  setAvailableFrying,
  availableGrill,
  setAvailableGrill,
  readyBurger,
  setReadyBurger,
}: {
  availableFrying: AvailableFrying[];
  setAvailableFrying: React.Dispatch<React.SetStateAction<AvailableFrying[]>>;
  availableGrill: AvailableGrill[];
  setAvailableGrill: React.Dispatch<React.SetStateAction<AvailableGrill[]>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
}) {
  // MODAL & TABS
  const [toggleModal, setToggleModal] = useState(false);
  const [activeTab, setActiveTab] = useState("bread");

  // LIMIT & PLACE HOLDER VARIABLES
  const limitSizeBurgerTray: number = 4;
  const emptyBurger: string = "Vide";
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
    },
    size: 0,
    price: 0,
    type: "burger",
  });

  // TABS
  const tabIngredient: TabIngredientKitchen[] = [
    {
      section: "bread",
      tabName: "Pain",
    },
    {
      section: "meat",
      tabName: "Viande",
    },
    {
      section: "meat",
      tabName: "Friture",
    },
    {
      section: "cheese",
      tabName: "Fromage",
    },
    {
      section: "variousIngredient",
      tabName: "Ingrédient",
    },
    {
      section: "sauce",
      tabName: "Sauce",
    },
  ];

  function handleClickSelectedTab(section: string) {
    setActiveTab(section);
  }

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
                      onClick={() => handleClickSelectedTab(tab.section)}
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
                    {bread.map((bread) => (
                      <button key={bread.ingredientName}>
                        {bread.ingredientName} : {bread.quantity}
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
                      <button key={meat.steak.ingredientName}>
                        {meat.steak.ingredientName} : {meat.quantity}
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
                      <button key={frying.frying.ingredientName}>
                        {frying.frying.ingredientName} : {frying.quantity}
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
                    {cheese.map((cheese) => (
                      <button key={cheese.ingredientName}>
                        {cheese.ingredientName} : {cheese.quantity}
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
                    {variousIngredient.map((ingredient) => (
                      <button key={ingredient.ingredientName}>
                        {ingredient.ingredientName} : {ingredient.quantity}
                      </button>
                    ))}
                  </div>
                  <div
                    className={
                      activeTab === tabIngredient[5].section
                        ? "tabOpen"
                        : "tabClose"
                    }
                  >
                    {sauce.map((sauce) => (
                      <button key={sauce.ingredientName}>
                        {sauce.ingredientName} : {sauce.quantity}
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
                <div>
                  {buildingBurger.ingredient.sauce !== undefined && (
                    <p>{buildingBurger.ingredient.sauce}</p>
                  )}
                  {buildingBurger.ingredient.variousIngredient !==
                    undefined && (
                    <p>{buildingBurger.ingredient.variousIngredient}</p>
                  )}
                  {buildingBurger.ingredient.cheese !== undefined && (
                    <p>{buildingBurger.ingredient.cheese}</p>
                  )}
                  {buildingBurger.ingredient.meat !== emptyBurger && (
                    <p>{buildingBurger.ingredient.meat}</p>
                  )}
                  {buildingBurger.ingredient.bread !== emptyBurger && (
                    <p>{buildingBurger.ingredient.bread}</p>
                  )}
                </div>
              </div>
              <div>
                <h3>Recettes</h3>
                <ul>
                  {allBurgers.map((burger) => (
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
                  {waitingArrayBurger.map((burger) => (
                    <button>
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
