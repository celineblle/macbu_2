import React, { useState } from "react";
import { Tray, Order } from "../../../interfaces/compositionElementsInterfaces";
import { displayNotEnoughBags } from "../../../functions/toastFunctions";
import {
  FinalProductBurger,
  FinalProductDessert,
  FinalProductDrink,
  FinalProductSide,
  FinalProductNugget,
} from "../../../interfaces/produitsInterfaces";

function ValidateOrders({
  cashFund,
  setCashFund,
  tray,
  setTray,
  trayIdSelected,
  ordersToPrepare,
  setOrdersToPrepare,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  tray: Tray[];
  setTray: React.Dispatch<React.SetStateAction<Tray[]>>;
  trayIdSelected: number;
  ordersToPrepare: Order[];
  setOrdersToPrepare: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [orderPrice, setOrderPrice] = useState<number>(0);

  // CHECK BY TYPE FUNCTION

  function checkProductByOne(
    currentProduct:
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget,
    currentTray: Tray
  ) {
    const orderProduct = currentProduct;
    const isItPresent: number | undefined = currentTray.products.findIndex(
      (product) => product.name === orderProduct.name
    );
    if (isItPresent !== undefined) {
      currentTray.products.splice(isItPresent, 1);
    }
    let orderPriceCopy = orderPrice;
    if (orderPriceCopy > orderProduct.price) {
      orderPriceCopy = orderPriceCopy - orderProduct.price;
      setOrderPrice(orderPriceCopy);
    } else {
      setOrderPrice(0);
    }
  }

  // START ORDER VALIDATION AND SORT PRODUCT BY INTERFACES
  function handleClickStartValidationByExtractToMenu(orderId: number) {
    const currentOrder = structuredClone(ordersToPrepare[orderId]);
    const currentTray = structuredClone(tray[trayIdSelected]);

    if (currentTray.bagCapacity > currentOrder.size) {
      for (let i = 0; i < currentOrder.products.length; i++) {
        const currentProduct = currentOrder.products[i];
        let isItPresent: number | undefined = 0;
        setOrderPrice(currentOrder.price);
        if ("sandwich" in currentProduct) {
          // menu
          checkProductByOne(currentProduct.sandwich, currentTray);
          checkProductByOne(currentProduct.side, currentTray);
          checkProductByOne(currentProduct.drink, currentTray);
          if ("dessert" in currentProduct) {
            // menu enfant
            checkProductByOne(currentProduct.dessert, currentTray);
          }
        } else {
          // regular product
          checkProductByOne(currentProduct, currentTray);
        }
      }
      console.log(orderPrice)
    } else {
      displayNotEnoughBags();
    }
  }
  return {
    handleClickStartValidationByExtractToMenu
  }
}

export default ValidateOrders;
