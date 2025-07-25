import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Grill.css";

function Grill() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="grillComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        ></button>
      </div>
      <div id="grillPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Grill</h2>
            <button className="closeModalButton">
              <img alt="fermer"></img>
            </button>
          </div>
          <div id="grillModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Grill;
