import React, { useState, useEffect, useContext } from "react";
import {
  FinalProductBurger,
  FinalProductSide,
  FinalProductDrink,
  FinalProductDessert,
  Ingredient,
  FinalProductBag,
  FinalProductNugget,
} from "../../../interfaces/produitsInterfaces";
import {
  NuggetBoxStock,
  Tray,
} from "../../../interfaces/compositionElementsInterfaces";
import { allBags, allFreshProducts } from "../../../elements/produits";
import {
  removeToStockOfProduct,
  remplaceOldProductByUpdateProduct,
  restoreToStockOfProduct,
} from "../../../functions/inventoryManagementFunctions";
import {
  SetStocksRawsIngredientsContext,
  StocksRawsIngredientsContext,
} from "../../../context/StockRawsContext";
import { displayNoStock } from "../../../functions/toastFunctions";
import { bag } from "../../../elements/ingredients";

function TrayCounterFunction({
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
  // CONTEXT
  const setStocksRawsIngredients = useContext(SetStocksRawsIngredientsContext);
  const stocksRawsIngredients = useContext(StocksRawsIngredientsContext);

  //EMPTY TRAY VARIABLE AND FUCTION
  const limitOfTray: number = 8;

  const emptyTray: Tray = {
    products: [
      {
        name: "Vide",
        ingredient: {
          nuggetQuantity: 0,
        },
        size: 0,
        price: 0,
        type: "Vide",
      },
    ],
    bagCapacity: 0,
    bag: [],
    price: 0,
    dateId: 0,
  };
  const [tray, setTray] = useState<Tray[]>([]);
  const [trayIdSelected, setTrayIdSelected] = useState<number>(0);

  function addEmptyTrayInRange() {
    if (tray.length < limitOfTray) {
      const newTray = structuredClone(emptyTray);
      newTray.dateId = tray.length;
      const trayArrayCopy = tray.slice();
      trayArrayCopy.push(newTray);
      setTray(trayArrayCopy);
    }
  }

  useEffect(() => {
    addEmptyTrayInRange();
  }, [tray]);

  // ADD PRODUCTS IN TRAY FUNCTIONS

  // ADD PRODUCT IN FINALPRODUCT INTERFACE
  function addFinalProductInTray(
    product:
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
  ) {
    const currentProduct = product;

    // add finalProduct in tray
    const trayCopy = tray.slice();
    trayCopy[trayIdSelected].products.push(currentProduct);
    setTray(trayCopy);
    // remove stock
    if ("bread" in currentProduct) {
      //burger
      const readyBurgerCopy = readyBurger.slice();
      const burgerIndex = readyBurger.findIndex(
        (burger) => burger.name === currentProduct.name
      );
      if (burgerIndex !== undefined) {
        readyBurgerCopy.splice(burgerIndex, 1);
        setReadyBurger(readyBurgerCopy);
      }
    } else if ("dessert" in currentProduct) {
      //dessert
      const readyDessert = readyIceCream.slice();
      const dessertIndex = readyIceCream.findIndex(
        (dessert) => dessert.name === currentProduct.name
      );
      if (dessertIndex !== undefined) {
        readyDessert.splice(dessertIndex, 1);
        setReadyIceCream(readyDessert);
      }
    } else if ("drink" in currentProduct) {
      //drink
      const readyDrinkCopy = readyDrink.slice();
      const drinkIndex = readyDrinkCopy.findIndex(
        (drink) => drink.name === currentProduct.name
      );
      if (drinkIndex !== undefined) {
        readyDrinkCopy.splice(drinkIndex, 1);
        setReadyDrink(readyDrinkCopy);
      }
    } else if ("side" in currentProduct) {
      //side
      const readySide = readyPortionFries.slice();
      const sideIndex = readyPortionFries.findIndex(
        (side) => side.name === currentProduct.name
      );
      if (sideIndex !== undefined) {
        readySide.splice(sideIndex, 1);
        setReadyPortionFries(readySide);
      }
    }
  }
  // ADD NUGGETS
  function addNuggetBoxInTray(product: NuggetBoxStock) {
    // add to the tray
    const trayCopy = tray.slice();
    trayCopy[trayIdSelected].products.push(product.boite);
    setTray(trayCopy);
    //remove to stock
    const nuggetCopy = readyNuggetBox.slice() as [
      NuggetBoxStock,
      NuggetBoxStock,
      NuggetBoxStock
    ];
    const nuggetIndex = readyNuggetBox.findIndex(
      (nugget) => nugget.boite.name === product.boite.name
    );
    if (nuggetIndex !== undefined) {
      nuggetCopy[nuggetIndex].quantity = nuggetCopy[nuggetIndex].quantity - 1;
      setReadyNuggetBox(nuggetCopy);
    }
  }

  function addFreshProductInTray(product: Ingredient) {
    // find the finalProduct version
    const finalFresh = allFreshProducts.find(
      (fresh) => fresh.name === product.ingredientName
    );
    // add to the tray
    if (finalFresh !== undefined) {
      const trayCopy = tray.slice();
      tray[trayIdSelected].products.push(finalFresh);
      setTray(trayCopy);
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
      const trayCopy = tray.slice();
      trayCopy[trayIdSelected].bagCapacity =
        trayCopy[trayIdSelected].bagCapacity + finalBag.ingredient.capacity;
      trayCopy[trayIdSelected].bag.push(finalBag);
      setTray(trayCopy);
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
  function handleClickRecoverProductAndSortByTypeToAddToTray(
    product:
      | Ingredient
      | FinalProductBurger
      | FinalProductSide
      | FinalProductDrink
      | FinalProductDessert
      | NuggetBoxStock
  ) {
    const currentProduct = product;
    if (tray[trayIdSelected].products[0].name === "Vide") {
      const trayCopy = tray.slice();
      trayCopy[trayIdSelected].products.shift();
    }

    if ("ingredientName" in currentProduct) {
      // Ingredient
      if (currentProduct.currentStocks > 0) {
        if (currentProduct.ingredientName.includes("sac")) {
          // bag
          addBagInTray(currentProduct);
        } else {
          // fresh product
          addFreshProductInTray(currentProduct);
        }
      } else {
        displayNoStock();
      }
    } else if ("boite" in currentProduct) {
      // NuggetBoxStock
      if (currentProduct.quantity > 0) {
        addNuggetBoxInTray(currentProduct);
      } else {
        displayNoStock();
      }
    } else if ("ingredient" in currentProduct) {
      // finalProduct_
      addFinalProductInTray(currentProduct);
    }
  }

  // REMOVE PRODUCTS TO TRAY FUNCTION

  // INDENTIFY AND REMOVE PRODUCT TO TRAY
  function removeProductToTray(
    product:
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
  ) {
    // remove to tray
    const trayCopy = tray.slice();
    const productIndex = trayCopy[trayIdSelected].products.findIndex(
      (inTray) => inTray.name === product.name
    );
    if (productIndex !== undefined) {
      trayCopy[trayIdSelected].products.splice(productIndex, 1);
      setTray(trayCopy);
    }

    // identify the product for restore stock
    const currentProduct = product;
    if (
      allFreshProducts.find((fresh) => fresh.name === currentProduct.name) !==
      undefined
    ) {
      // fresh
      const freshIngredient = stocksRawsIngredients[7].productionArray.find(
        (fresh) => fresh.ingredientName === currentProduct.name
      );
      if (freshIngredient !== undefined) {
        const updatedProduct = restoreToStockOfProduct(freshIngredient);
        const updatedArray = remplaceOldProductByUpdateProduct(
          stocksRawsIngredients[7].sectionName,
          updatedProduct
        );
        if (setStocksRawsIngredients !== undefined) {
          setStocksRawsIngredients(updatedArray);
        }
      }
    } else if ("bread" in currentProduct) {
      // burger
      const burgerCopy = readyBurger.slice();
      burgerCopy.push(currentProduct);
      setReadyBurger(burgerCopy);
    } else if ("dessert" in currentProduct) {
      //ice cream
      const iceCreamCopy = readyIceCream.slice();
      iceCreamCopy.push(currentProduct);
      setReadyIceCream(iceCreamCopy);
    } else if ("drink" in currentProduct) {
      // drink
      const drinkCopy = readyDrink.slice();
      drinkCopy.push(currentProduct);
      setReadyDrink(drinkCopy);
    } else if ("side" in currentProduct) {
      // fries
      const friesCopy = readyPortionFries.slice();
      friesCopy.push(currentProduct);
      setReadyPortionFries(friesCopy);
    } else if ("nuggetQuantity" in currentProduct.ingredient) {
      //nugget
      const nuggetBoxCopy = readyNuggetBox.slice() as [
        NuggetBoxStock,
        NuggetBoxStock,
        NuggetBoxStock
      ];
      console.log(nuggetBoxCopy);
      const nuggetIndex: number | undefined = nuggetBoxCopy.findIndex(
        (nugget) => nugget.boite.name === currentProduct.name
      );
      if (nuggetIndex !== undefined) {
        nuggetBoxCopy[nuggetIndex].quantity =
          nuggetBoxCopy[nuggetIndex].quantity + 1;
        setReadyNuggetBox(nuggetBoxCopy);
      }
    }
  }

  // REMOVE BAG
  function removeBagToTray(product: FinalProductBag) {
    const trayCopy = tray.slice();
    // remove bag capacity
    trayCopy[trayIdSelected].bagCapacity =
      trayCopy[trayIdSelected].bagCapacity - product.ingredient.capacity;
    // remove bag final product to bag Array
    const bagIndex = trayCopy[trayIdSelected].bag.findIndex(
      (bag) => bag.name === product.name
    );
    if (bagIndex !== undefined) {
      trayCopy[trayIdSelected].bag.splice(bagIndex, 1);
      setTray(trayCopy);
    }

    // restore stock
    const bagIngredient = bag.find(
      (bagIngredient) => bagIngredient.ingredientName === product.name
    );
    if (bagIngredient !== undefined) {
      const updatedProduct = restoreToStockOfProduct(bagIngredient);
      const updatedArray = remplaceOldProductByUpdateProduct(
        "bag",
        updatedProduct
      );
      if (setStocksRawsIngredients !== undefined) {
        setStocksRawsIngredients(updatedArray);
      }
    }
  }

  // REMOVE PRODUCTS AND START FUNCTION
  function handleClickIdentifyTrayAndSortByTypeOfProduct(
    product:
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
      | FinalProductBag
  ) {
    // identify product
    const currentProduct = product;
    if (currentProduct.name !== "Vide") {
      if ("bag" in currentProduct) {
        removeBagToTray(currentProduct);
      } else {
        removeProductToTray(currentProduct);
      }
    }
  }

  // identify the product
  // remove from the tray
  // restore stock

  return {
    tray,
    trayIdSelected,
    setTrayIdSelected,
    handleClickRecoverProductAndSortByTypeToAddToTray,
    handleClickIdentifyTrayAndSortByTypeOfProduct,
  };
}

export default TrayCounterFunction;
