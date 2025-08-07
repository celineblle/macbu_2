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
import { removeToStockOfProduct, remplaceOldProductByUpdateProduct } from "../../functions/inventoryManagementFunctions";
import { SetStocksRawsIngredientsContext, StocksRawsIngredientsContext } from "../../context/StockRawsContext";

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

  // CONTEXT
const setStocksRawsIngredients = useContext(SetStocksRawsIngredientsContext)
const stocksRawsIngredients = useContext(StocksRawsIngredientsContext)

  // GLOBAL TOOLS
  const limitOfOrdersPlace: number = 4;
  const emptyOrder: string = "Vide";

  // ORDERS TO PREPARE TOOLS
  const limitOfOrders: number = 10;
  const [ordersToPrepare, setOrdersToPrepare] = useState<Order[]>([]);
  const ordersToPrepareRef = useRef<Order[]>([]);
  // empty place
  const [emptyPlacesPrepare, setEmptyPlacePrepare] = useState<string[]>([]);

  useEffect(() => {
    // update ref
    ordersToPrepareRef.current = ordersToPrepare;

    // add empty place for front
    if (ordersToPrepare.length < limitOfOrdersPlace) {
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

  //ORDER IN PREPARATION
  const limitOfTray: number = 8;
  const emptyTray: Tray = {
    products: [],
    bagCapacity: 0,
    bag: [],
    price: 0,
    dateId: 0,
  };
  const [tray, setTray] = useState<Tray[]>([]);
  const [trayIdSelected, setTrayIdSelected] = useState<number>([]);
  // empty place
  const [emptyPlacesPreparation, setEmptyPlacesPreparation] = useState<
    string[]
  >([]);

  useEffect(() => {
    for (let i = 0; i < limitOfTray; i++) {
      emptyTray.dateId = i;
      tray.push(emptyTray);
    }
    emptyTray.dateId = 0;
  }, []);

  // TRAY VARIABLES

  //   {
  //   products: (
  //     | FinalProductBurger
  //     | FinalProductDessert
  //     | FinalProductDrink
  //     | FinalProductSide
  //     | NuggetBoxStock
  //   )[];
  //   bagCapacity: number;
  //   bag: FinalProductBag[];
  //   price: number;
  //   dateId: number;
  // }

  function addBagInTray(product: Ingredient) {
    const currentBag: FinalProductBag | undefined = allBags.find(
      (bag) => bag.name === product.ingredientName
    );
    if (currentBag !== undefined) {
      tray[trayIdSelected].bagCapacity =
        tray[trayIdSelected].bagCapacity + currentBag.ingredient.capacity;
      tray[trayIdSelected].bag.push(currentBag);
      const updatedProduct: Ingredient = removeToStockOfProduct(product);
      const updatedStock = remplaceOldProductByUpdateProduct("bag", updatedProduct);
      if(setStocksRawsIngredients !== undefined) {
        setStocksRawsIngredients(updatedStock)
      }
    }
  }

  function addNuggetInTray(product: NuggetBoxStock) {
    const newNugget: FinalProductNugget | undefined = allNuggets.find((nugget) => nugget.name === product.boite.name);
    if(newNugget !== undefined) {
      tray[trayIdSelected].products.push(newNugget)
      const nuggetBoxIndex: number = readyNuggetBox.findIndex((nugget) => nugget.boite.name === product.boite.name);
      if(nuggetBoxIndex !== undefined) {
        const nuggetBoxCopy = readyNuggetBox.slice() as [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]
        nuggetBoxCopy[nuggetBoxIndex].quantity = nuggetBoxCopy[nuggetBoxIndex].quantity - 1;
        setReadyNuggetBox(nuggetBoxCopy); 
      }
    }
  }

  function removeProductFromRightStock(product: FinalProductBurger
      | FinalProductSide
      | FinalProductDrink
      | FinalProductDessert) {
            const currentProduct = product;
tray[trayIdSelected].products.push(currentProduct);
if("bread" in currentProduct) {
  const burgerArrayCopy = readyBurger.slice()
  const productIndex: number | undefined = readyBurger.findIndex((burger) => burger.name === currentProduct.name);
  burgerArrayCopy.splice(productIndex, 1);
  setReadyBurger(burgerArrayCopy)
} else if("side" in currentProduct) {
  const frieIndex: number | undefined = readyPortionFries.findIndex((frie) => frie.name === currentProduct.name);
  if(frieIndex !== undefined) {
    const frieArrayCopy = readyPortionFries.slice()
    frieArrayCopy.splice(frieIndex, 1)
    setReadyPortionFries(frieArrayCopy)
  } else {
    const rawStockCopy = stocksRawsIngredients.slice();
   const freshProductIndex =  raw
  }
}



      }


  // ADD INGREDIENT IN TRAY
  function addIngredientInTray(
    product:
      | Ingredient
      | FinalProductBurger
      | FinalProductSide
      | FinalProductDrink
      | FinalProductDessert
      | NuggetBoxStock
  ) {
    const currentProduct = product;
    if ("ingredientName" in currentProduct) {
      addBagInTray(currentProduct);
    } else if("boite" in currentProduct) {
addNuggetInTray(currentProduct)
    } else {
      

    }
  }

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
              <h3>Commandes en préparation</h3>
              {tray.map((order) => (
                <button key={order.dateId}>
                  <ul>
                    {order.products.map((product) => (
                      "boite" in product ?
                      <li>{product.boite}</li> :
                      <li>{product.name}</li>
                    ))}
                  </ul>
                  <ul>
                    {order.bag.map((bag) => (
                      <li>{bag.name}</li>
                    ))}
                  </ul>
                </button>
              ))}
              {emptyPlacesPreparation.map((place, i) => (
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
