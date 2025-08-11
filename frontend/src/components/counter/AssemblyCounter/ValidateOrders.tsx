import React, { useContext } from "react";
import { Tray, Order } from "../../../interfaces/compositionElementsInterfaces";
import {
  displayNoProductsInTray,
  displayNotEnoughBags,
} from "../../../functions/toastFunctions";
import {
  FinalProductBurger,
  FinalProductDessert,
  FinalProductDrink,
  FinalProductSide,
  FinalProductNugget,
} from "../../../interfaces/produitsInterfaces";
import { toast } from "react-toastify";
import {
  OrdersToPrepareContext,
  SetOrdersToPrepareContext,
} from "../../../context/OrderContext";

function ValidateOrders({
  cashFund,
  setCashFund,
  tray,
  setTray,
  trayIdSelected,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  tray: Tray[];
  setTray: React.Dispatch<React.SetStateAction<Tray[]>>;
  trayIdSelected: number;
}) {
  //ORDERS CONTEXT
  const ordersToPrepare = useContext(OrdersToPrepareContext);
  const setOrdersToPrepare = useContext(SetOrdersToPrepareContext);

  let orderPrice = 0;
  // TOAST FONCTION FOR VALIDATION
  const orderValidate = () => (
    <div>
      <p>+ {orderPrice}</p>
    </div>
  );

  function displayOrderValidate() {
    toast.error(orderValidate);
  }

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
    const isItPresent: number = currentTray.products.findIndex(
      (product) => product.name === orderProduct.name
    );

    if (isItPresent !== -1) {
      currentTray.products.splice(isItPresent, 1);
    } else {
      if (orderPrice > currentProduct.price) {
        orderPrice = orderPrice - currentProduct.price;
      } else {
        orderPrice = 0;
      }
    }

    return isItPresent;
  }

  function startCheckForOrder(currentOrder: Order, currentTray: Tray) {
    orderPrice = currentOrder.price;

    for (let i = 0; i < currentOrder.products.length; i++) {
      const currentProduct = currentOrder.products[i];
      let isItPresent: number | undefined = 0;
      // browse in menu
      const menuProperty = ["sandwich", "side", "drink"];
      if ("sandwich" in currentProduct) {
        // menu
        for (let j = 0; j < menuProperty.length; j++) {
          isItPresent = checkProductByOne(currentProduct.sandwich, currentTray);
          if (isItPresent !== undefined) {
            orderPrice = orderPrice - 2;
          }
        }
      } else {
        // regular product
        checkProductByOne(currentProduct, currentTray);
      }
    }
  }

  function calculateTrayBagRequirements(currentTray: Tray): number {
    let trayProductSize: number = 0;
    for (let i = 0; i < currentTray.products.length; i++) {
      trayProductSize = trayProductSize + currentTray.products[i].size;
    }
    return trayProductSize;
  }

  // START ORDER VALIDATION AND SORT PRODUCT BY INTERFACES
  function handleClickStartValidationByExtractToMenu(orderId: number) {
    const currentOrder = structuredClone(ordersToPrepare[orderId]);
    const currentTray = structuredClone(tray[trayIdSelected]);

    //do not accept the tray if there are not enough bags
    if (currentTray.products[0].name !== "Vide") {
      // verify the size of the tray and check if the tray have enough bags for all products
      const trayProductSize = calculateTrayBagRequirements(currentTray);

      if (currentTray.bagCapacity > trayProductSize) {
        // browse the entire order to validate the products on the tray one by one and update the order price
        startCheckForOrder(currentOrder, currentTray);

        // update orders array
        const orderArrayCopy = ordersToPrepare.slice();
        orderArrayCopy.splice(orderId, 1);
        if (setOrdersToPrepare !== undefined) {
          setOrdersToPrepare(orderArrayCopy);
        }

        // update tray
        const trayArrayCopy = tray.slice();
        trayArrayCopy.splice(trayIdSelected, 1);
        setTray(trayArrayCopy);

        // update budget
        const newBudget = cashFund + orderPrice;
        setCashFund(newBudget);

        displayOrderValidate();
      } else {
        displayNotEnoughBags();
      }
    } else {
      displayNoProductsInTray();
    }
  }
  return {
    handleClickStartValidationByExtractToMenu,
  };
}

export default ValidateOrders;
