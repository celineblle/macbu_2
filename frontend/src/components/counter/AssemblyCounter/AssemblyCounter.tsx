import React, { useEffect, useRef, useState } from "react";
import {
  setActionModal,
  updateEmptyPlace,
  handleClickSelectedTab,
} from "../../../functions/generalsFuctions";
import "../../../style/AssemblyCounter.css";
import {
  FinalProductBurger,
  FinalProductDrink,
  FinalProductDessert,
  FinalProductSide,
  Ingredient,
} from "../../../interfaces/produitsInterfaces";
import { generateRamdomOrders } from "../../../functions/Order";
import {
  Order,
  NuggetBoxStock,
} from "../../../interfaces/compositionElementsInterfaces";
import TrayCounterFunction from "./TrayCounterFunction";
import AssemblyCounterTools from "./AssemblyCounterTools";
import ValidateOrders from "./ValidateOrders";

function AssemblyCounter({
  cashFund,
  setCashFund,
  readyBurger,
  setReadyBurger,
  readyIceCream,
  setReadyIceCream,
  readyDrink,
  setReadyDrink,
  readyPortionFries,
  setReadyPortionFries,
  readyNuggetBox,
  setReadyNuggetBox,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
  readyIceCream: FinalProductDessert[];
  setReadyIceCream: React.Dispatch<React.SetStateAction<FinalProductDessert[]>>;
  readyDrink: FinalProductDrink[];
  setReadyDrink: React.Dispatch<React.SetStateAction<FinalProductDrink[]>>;
  readyPortionFries: FinalProductSide[];
  setReadyPortionFries: React.Dispatch<
    React.SetStateAction<FinalProductSide[]>
  >;
  readyNuggetBox: [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
  setReadyNuggetBox: React.Dispatch<
    React.SetStateAction<[NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]>
  >;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  // GLOBAL TOOLS
  const limitOfOrdersPlace: number = 4;
  const emptyOrder: string = "Vide";

  // ORDERS TO PREPARE VARIABLES
  const limitOfOrders: number = 10;
  const [ordersToPrepare, setOrdersToPrepare] = useState<Order[]>([]);
  const ordersToPrepareRef = useRef<Order[]>([]);
  // empty place
  const [emptyPlacesPrepare, setEmptyPlacePrepare] = useState<string[]>([]);

  // UPDATE REF, UPDATE EMPTY PLACE ARRAY AND START NEW ORDERS TO PREPARE
  useEffect(() => {
    // update ref
    ordersToPrepareRef.current = ordersToPrepare;

    // add empty place for front
    if (ordersToPrepareRef.current.length < limitOfOrdersPlace) {
      // update empty place array
      updateEmptyPlace(
        ordersToPrepare.length,
        limitOfOrdersPlace,
        setEmptyPlacePrepare,
        emptyOrder
      );
    } else {
      if (emptyPlacesPrepare.length !== 0) {
        setEmptyPlacePrepare([]);
      }
    }
    // add new orders
    if (ordersToPrepareRef.current.length < limitOfOrders) {
      setTimeout(() => {
        const newOrder = generateRamdomOrders();

        setOrdersToPrepare([...ordersToPrepareRef.current, newOrder]);
      }, 1000);
    }
  }, [ordersToPrepare]);

  // TABS
  const [activeTab, setActiveTab] = useState<string>("burger");

  const { tabsCounterArray } = AssemblyCounterTools({
    readyBurger,
    readyPortionFries,
    readyDrink,
    readyNuggetBox,
    readyIceCream,
  });

  // TRAY FUNCTIONS
  const {
    tray,
    setTray,
    trayIdSelected,
    setTrayIdSelected,
    handleClickRecoverProductAndSortByTypeToAddToTray,
    handleClickIdentifyTrayAndSortByTypeOfProduct,
  } = TrayCounterFunction({
    readyBurger,
    readyPortionFries,
    readyDrink,
    readyNuggetBox,
    readyIceCream,
    setReadyNuggetBox,
    setReadyBurger,
    setReadyIceCream,
    setReadyDrink,
    setReadyPortionFries,
  });

  // UPDATE TRAY ID
  function updateTrayId(id: number) {
    setTrayIdSelected(id);
  }

  // VALIDATE ORDER
  const {handleClickStartValidationByExtractToMenu} = ValidateOrders({  cashFund,
  setCashFund,
  tray,
  setTray,
  trayIdSelected,
  ordersToPrepare,
  setOrdersToPrepare,})

  return (
    <div id="assemblyCounterComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Comptoir
        </button>
        <p>Commandes en attente : {ordersToPrepare.length}</p>
      </div>
      <div id="assemblyCounterPageContent">
        <h3>Commandes en preparation</h3>
      </div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Comptoir</h2>
            <p>Budget : {cashFund}</p>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="assemblyCounterModalContent">
            <div>
              <h3>commandes à préparer</h3>
              {ordersToPrepare.map(
                (order, index) =>
                  index < 10 && (
                    <button key={order.dateId + index}
                    onClick={() => handleClickStartValidationByExtractToMenu(index)}
                    >
                      <ul>
                        {order.products.map((detail, i) =>
                          "sandwich" in detail ? (
                              <ul key={detail.dateId + i}>
                                <li>Menu</li>
                                <li>{detail.sandwich.name}</li>
                                <li>{detail.side.name}</li>
                                <li>{detail.drink.name}</li>
                              </ul>
                            )
                           : (
                            <li key={detail.name + i}>{detail.name}</li>
                          )
                        )}
                      </ul>
                    </button>
                  )
              )}
              {emptyPlacesPrepare.map((place, i) => (
                <button key={i}>{place}</button>
              ))}
            </div>
            <div>
              <h3>Commandes en préparation</h3>
              {tray.map((uniqueTray, i) => (
                <ul
                  key={uniqueTray.dateId + i}
                  onClick={() => updateTrayId(uniqueTray.dateId)}
                >
                  {uniqueTray.products.map((product, i) => (
                    <button
                      key={product.price + i}
                      onClick={() =>
                        handleClickIdentifyTrayAndSortByTypeOfProduct(product)
                      }
                    >
                      {product.name}
                    </button>
                  ))}
                  {uniqueTray.bag.map((bag, i) => (
                    <button
                      key={bag.ingredient.capacity + i}
                      onClick={() =>
                        handleClickIdentifyTrayAndSortByTypeOfProduct(bag)
                      }
                    >
                      {bag.name}
                    </button>
                  ))}
                </ul>
              ))}
            </div>
            <div>
              <h3>Produits</h3>
              <div>
                <div id="tabs">
                  {tabsCounterArray.map((tab) => (
                    <button
                      key={tab.tabName}
                      onClick={() =>
                        handleClickSelectedTab(tab.section, setActiveTab)
                      }
                    >
                      {tab.tabName}
                    </button>
                  ))}
                </div>
                {tabsCounterArray.map((array) => (
                  <div
                    className={
                      activeTab === array.section ? "tabOpen" : "tabClose"
                    }
                    key={array.tabName}
                  >
                    {array.correspondingArray.map(
                      (
                        product:
                          | FinalProductBurger
                          | FinalProductSide
                          | FinalProductDrink
                          | FinalProductDessert
                          | NuggetBoxStock
                          | Ingredient,
                        i
                      ) =>
                        "boite" in product && "quantity" in product ? (
                          <button
                            onClick={() =>
                              handleClickRecoverProductAndSortByTypeToAddToTray(
                                product
                              )
                            }
                            key={product.quantity + i}
                          >
                            {product.boite.name} : {product.quantity}
                          </button>
                        ) : "currentStocks" in product ? (
                          <button
                            onClick={() =>
                              handleClickRecoverProductAndSortByTypeToAddToTray(
                                product
                              )
                            }
                            key={product.dateId + i}
                          >
                            {product.ingredientName} : {product.currentStocks}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleClickRecoverProductAndSortByTypeToAddToTray(
                                product
                              )
                            }
                            key={product.price + i}
                          >
                            {product.name}
                          </button>
                        )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyCounter;
