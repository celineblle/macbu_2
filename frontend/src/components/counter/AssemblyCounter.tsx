import React, { useContext, useEffect, useRef, useState } from "react";
import {
  setActionModal,
  updateEmptyPlace,
} from "../../functions/generalsFuctions";
import "../../style/AssemblyCounter.css";
import {
  FinalProductBurger,
  FinalProductDrink,
  FinalProductDessert,
  FinalProductBag,
  FinalProductNugget,
} from "../../interfaces/produitsInterfaces";
import { generateRamdomOrders } from "../../functions/Order";
import { Order, Tray } from "../../interfaces/compositionElementsInterfaces";
import { FinalProductSide } from "../../interfaces/produitsInterfaces";
import { NuggetBoxStock } from "../../interfaces/compositionElementsInterfaces";
import TabsAssemblyCounter from "./TabsAssemblyCounter";
import { Ingredient } from "../../interfaces/produitsInterfaces";
import { allBags, allFreshProducts, allNuggets } from "../../elements/produits";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
} from "../../functions/inventoryManagementFunctions";
import {
  SetStocksRawsIngredientsContext,
  StocksRawsIngredientsContext,
} from "../../context/StockRawsContext";
import { freshProduct } from "../../elements/ingredients";
import AssemblyCounterTools from "./AssemblyCounterTools";

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
    if (ordersToPrepare.length < limitOfOrdersPlace) {
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
    if (ordersToPrepare.length < limitOfOrders) {
      setTimeout(() => {
        const newOrder = generateRamdomOrders();

        setOrdersToPrepare([...ordersToPrepareRef.current, newOrder]);
      }, 1000);
    }
  }, [ordersToPrepare]);

  return (
    <div id="assemblyCounterComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Comptoir
        </button>
        <p>Commandes en attente : </p>
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
                    <button key={order.dateId}>
                      <ul>
                        {order.products.map((detail) =>
                          "sandwich" in detail ? (
                            "dessert" in detail ? (
                              <ul key={detail.dateId}>
                                <li>Menu enfant</li>
                                <li>{detail.sandwich.name}</li>
                                <li>{detail.side.name}</li>
                                <li>{detail.drink.name}</li>
                                <li>{detail.dessert.name}</li>
                              </ul>
                            ) : (
                              <ul key={detail.dateId}>
                                <li>Menu</li>
                                <li>{detail.sandwich.name}</li>
                                <li>{detail.side.name}</li>
                                <li>{detail.drink.name}</li>
                              </ul>
                            )
                          ) : (
                            <li key={detail.name}>{detail.name}</li>
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
              <h3>Produits</h3>
              <TabsAssemblyCounter  
              readyBurger={readyBurger}
  readyPortionFries={readyPortionFries}
  readyDrink={readyDrink}
  readyNuggetBox={readyNuggetBox}
  readyIceCream={readyIceCream}
  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyCounter;
