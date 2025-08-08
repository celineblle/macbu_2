import React, { useState, useEffect, useContext } from "react";
import {
  FinalProductBurger,
  FinalProductSide,
  FinalProductDrink,
  FinalProductNugget,
  FinalProductDessert,
  Ingredient,
  FinalProductBag,
} from "../../interfaces/produitsInterfaces";
import {
  NuggetBoxStock,
  Tray,
} from "../../interfaces/compositionElementsInterfaces";
import AssemblyCounterTools from "./AssemblyCounterTools";
import { allBags, allFreshProducts, allNuggets } from "../../elements/produits";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
} from "../../functions/inventoryManagementFunctions";
import {
  StocksRawsIngredientsContext,
  SetStocksRawsIngredientsContext,
} from "../../context/StockRawsContext";
import { freshProduct } from "../../elements/ingredients";

function TrayCounter({
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
}: {
  readyBurger: FinalProductBurger[];
  readyPortionFries: FinalProductSide[];
  readyDrink: FinalProductDrink[];
  readyNuggetBox: [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
  readyIceCream: FinalProductDessert[];
  setReadyNuggetBox: React.Dispatch<
    React.SetStateAction<[NuggetBoxStock, NuggetBoxStock, NuggetBoxStock]>
  >;
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
setReadyIceCream: React.Dispatch<React.SetStateAction<FinalProductDessert[]>>;
setReadyDrink: React.Dispatch<React.SetStateAction<FinalProductDrink[]>>;
setReadyPortionFries: React.Dispatch<
    React.SetStateAction<FinalProductSide[]>
  >;
}) {
  // TABS
  const { tabsCounterArray } = AssemblyCounterTools({
    readyBurger,
    readyPortionFries,
    readyDrink,
    readyNuggetBox,
    readyIceCream,
  });

  // CONTEXT

  const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);
  const setStocksRawsIngredients = useContext(SetStocksRawsIngredientsContext);

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
  const [trayIdSelected, setTrayIdSelected] = useState<number>(0);
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

  //  {
  //   products: (
  //     | FinalProductBurger
  //     | FinalProductDessert
  //     | FinalProductDrink
  //     | FinalProductSide
  //     | FinalProductNugget
  //   )[];
  //   bagCapacity: number;
  //   bag: FinalProductBag[];
  //   price: number;
  //   dateId: number;
  // }

  function addFinalProductInTray(
    product:
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
  ) {
    const currentProduct = product;

    // add finalProduct in tray
    tray[trayIdSelected].products.push(currentProduct);
    // remove stock
    if ("bread" in currentProduct) {
      //burger
      const readyBurgerCopy = readyBurger.slice();
      const burgerIndex = readyBurger.findIndex(
        (burger) => burger.name === currentProduct.name
      );
      readyBurgerCopy.splice(burgerIndex, 1);
      setReadyBurger(readyBurgerCopy);
    } else if ("dessert" in currentProduct) {
      //dessert
      const readyDessert = readyIceCream.slice()
      const dessertIndex = readyIceCream.findIndex((dessert) => dessert.name === currentProduct.name);
      readyDessert.splice(dessertIndex, 1)
      setReadyIceCream(readyDessert)
    } else if ("drink" in currentProduct) {
      //drink
      const readyDrinkCopy = readyDrink.slice()
      const drinkIndex = readyDrinkCopy.findIndex((drink) => drink.name === currentProduct.name)
      readyDrinkCopy.splice(drinkIndex, 1)
      setReadyDrink(readyDrinkCopy)
    } else if ("side" in currentProduct) {
      //side
      const readySide = readyPortionFries.slice();
      const sideIndex = readyPortionFries.findIndex((side) => side.name === currentProduct.name)
      readySide.splice(sideIndex, 1);
      setReadyPortionFries(readySide);
    }
  }

  function addNuggetBoxInTray(product: NuggetBoxStock) {
    // add to the tray
    tray[trayIdSelected].products.push(product.boite);
    //remove to stock
    const nuggetCopy = readyNuggetBox.slice() as [
      NuggetBoxStock,
      NuggetBoxStock,
      NuggetBoxStock
    ];
    const nuggetIndex = readyNuggetBox.findIndex(
      (nugget) => nugget.boite.name === product.boite.name
    );
    nuggetCopy[nuggetIndex].quantity = nuggetCopy[nuggetIndex].quantity - 1;
    setReadyNuggetBox(nuggetCopy);
  }

  function addFreshProductInTray(product: Ingredient) {
    // find the finalProduct version
    const finalFresh = allFreshProducts.find(
      (fresh) => fresh.name === product.ingredientName
    );
    // add to the tray
    if (finalFresh !== undefined) {
      tray[trayIdSelected].products.push(finalFresh);
      // remove to stock
      const updatedProduct = removeToStockOfProduct(product);
      const updatedArray = remplaceOldProductByUpdateProduct(
        "freshProduct",
        updatedProduct
      );
      if (setStocksRawsIngredients !== undefined) {
        setStocksRawsIngredients(updatedArray);
      }
    }
  }

  // ADD BAG
  function addBagInTray(product: Ingredient) {
    // recovery the finalProduct version
    const finalBag: FinalProductBag | undefined = allBags.find(
      (bag) => bag.name === product.ingredientName
    );

    // add in the order
    if (finalBag !== undefined) {
      tray[trayIdSelected].bagCapacity =
        tray[trayIdSelected].bagCapacity + finalBag.ingredient.capacity;
      tray[trayIdSelected].bag.push(finalBag);
      // remove from stock
      const updatedProduct = removeToStockOfProduct(product);
      const updatedArray = remplaceOldProductByUpdateProduct(
        "bag",
        updatedProduct
      );
      if (setStocksRawsIngredients !== undefined) {
        setStocksRawsIngredients(updatedArray);
      }
    }
  }

  // ADD PRODUCT TO TRAY START FUNCTION
  function recoverProductAndSortByTypeToAddToTray(
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
      // Ingredient
      if (currentProduct.ingredientName.includes("sac")) {
        // bag
        addBagInTray(currentProduct);
      } else {
        // fresh product
        addFreshProductInTray(currentProduct);
      }
    } else if ("boite" in currentProduct) {
      // NuggetBoxStock
      addNuggetBoxInTray(currentProduct);
    } else if ("ingredient" in currentProduct) {
      // finalProduct_
      addFinalProductInTray(currentProduct)
    }
  }

  return (
    <div>
      <h3>Commandes en préparation</h3>
      {tray.map((order) => (
        <button key={order.dateId}>
          <ul>
            {order.products.map((product) =>
              "boite" in product ? <li></li> : <li>{product.name}</li>
            )}
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
  );
}

export default TrayCounter;
