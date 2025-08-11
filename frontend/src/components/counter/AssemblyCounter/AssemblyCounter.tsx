import React, { useContext, useEffect, useRef, useState } from "react";
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
import { size } from "../../../elements/ingredients";
import { allBags } from "../../../elements/produits";
import {
  OrdersToPrepareContext,
  SetOrdersToPrepareContext,
} from "../../../context/OrderContext";

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

  //ORDERS CONTEXT
  const ordersToPrepare = useContext(OrdersToPrepareContext);
  const setOrdersToPrepare = useContext(SetOrdersToPrepareContext);

  // ORDERS TO PREPARE VARIABLES
  const limitOfOrders: number = 10;
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
        if (setOrdersToPrepare !== undefined) {
          setOrdersToPrepare([...ordersToPrepareRef.current, newOrder]);
        }
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
  const { handleClickStartValidationByExtractToMenu } = ValidateOrders({
    cashFund,
    setCashFund,
    tray,
    setTray,
    trayIdSelected,
  });

  return (
    <div id="assemblyCounterComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          COMPTOIR
        </button>
        <p>Commandes en attente : {ordersToPrepare.length}</p>
      </div>
      <div id="assemblyCounterPageContent">
        <h3>Commandes en preparation</h3>
        <div id="trayArrayFrontPage">
          {tray.map((uniqueTray) => (
            <ul className="cookingOrder assemblyComptoirTrayFrontPage">
              <li>Taille : {uniqueTray.bagCapacity}</li>
              {uniqueTray.products.map((product, i) => (
                <li key={i}>{product.name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Comptoir</h2>
            <p>Budget : {cashFund} €</p>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="assemblyCounterModalContent">
            <div id="orderCounter">
              <h3>commandes à préparer</h3>
              <div id="orderArrayCounter">
                {ordersToPrepare.map(
                  (order, index) =>
                    index < 10 && (
                      <button
                        key={order.dateId + index}
                        onClick={() =>
                          handleClickStartValidationByExtractToMenu(index)
                        }
                        className="readyOrder uniqueOrdrer"
                      >
                        <ul>
                          <li>N° de commande : {index + 1}</li>
                          <li>Taille : {order.size}</li>
                          {order.products.map((detail, i) =>
                            "sandwich" in detail ? (
                              <ul key={detail.dateId + i}>
                                <li>Menu</li>
                                <li>{detail.sandwich.name}</li>
                                <li>{detail.side.name}</li>
                                <li>{detail.drink.name}</li>
                              </ul>
                            ) : (
                              <li key={detail.name + i}>{detail.name}</li>
                            )
                          )}
                          <li>Prix : {order.price} €</li>
                        </ul>
                      </button>
                    )
                )}
                {emptyPlacesPrepare.map((place, i) => (
                  <button key={i} className="readyOrder">
                    {place}
                  </button>
                ))}
              </div>
            </div>
            <div id="trayCounter">
              <h3>Commandes en préparation</h3>
              <div id="trayArray">
                {tray.map((uniqueTray, i) => (
                  <ul
                    key={uniqueTray.dateId + i}
                    onClick={() => updateTrayId(uniqueTray.dateId)}
                    className="allTray"
                  >
                    {uniqueTray.products.map((product, i) => (
                      <button
                        key={product.price + i}
                        onClick={() =>
                          handleClickIdentifyTrayAndSortByTypeOfProduct(product)
                        }
                        className="cookingOrder uniqueTray"
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
                        className="cookingOrder uniqueTray"
                      >
                        {bag.name}
                      </button>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div id="productCounter">
              <h3>Produits</h3>
              <div>
                <div>
                  {tabsCounterArray.map((tab) => (
                    <button
                      key={tab.tabName}
                      onClick={() =>
                        handleClickSelectedTab(tab.section, setActiveTab)
                      }
                      className="tabs"
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
              <div id="counterIndication">
                <ul>
                  {allBags.map((element) => (
                    <li key={element.name}>
                      {element.name}
                      Capacité : {element.ingredient.capacity}
                    </li>
                  ))}
                  {size.map((element) => (
                    <li key={element.name}>
                      {element.name}
                      Taille : {element.capacity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyCounter;
