import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/IceCream.css";

function IceCream() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="iceCreamComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Glace
        </button>
      </div>
      <div id="iceCreamPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Glace</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="iceCreamModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default IceCream;
