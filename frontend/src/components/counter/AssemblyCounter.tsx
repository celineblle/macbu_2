import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyCounter.css";
import {
  FinalProductBurger,
  FinalProductDrink,
  FinalProductDessert,
} from "../../interfaces/produitsInterfaces";
import { generateRamdomOrders } from "../../functions/Order";

function AssemblyCounter({
  cashFund,
  setCashFund,
  readyBurger,
  setReadyBurger,
  readyIceCream,
  setReadyIceCream,
  readyDrink,
  setReadyDrink,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
  readyIceCream: FinalProductDessert[];
  setReadyIceCream: React.Dispatch<React.SetStateAction<FinalProductDessert[]>>;
  readyDrink: FinalProductDrink[];
  setReadyDrink: React.Dispatch<React.SetStateAction<FinalProductDrink[]>>;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);


const order = generateRamdomOrders()
  console.log(order);

  return (
    <div id="assemblyCounterComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Comptoir
        </button>
      </div>
      <div id="assemblyCounterPageContent">
      </div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Comptoir</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="assemblyCounterModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyCounter;
