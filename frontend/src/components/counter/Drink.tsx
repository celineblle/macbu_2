import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Drink.css";

function Drink() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="drinkComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Boisson
        </button>
      </div>
      <div id="drinkPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Boisson</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="drinkModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Drink;
