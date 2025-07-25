import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Fries.css";

function Fries() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="friesComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        ></button>
      </div>
      <div id="friesPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Frites</h2>
            <button className="closeModalButton">
              <img alt="fermer"></img>
            </button>
          </div>
          <div id="friesModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Fries;
