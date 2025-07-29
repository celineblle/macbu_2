import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Nugget.css";

function Nugget() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="nuggetComponent" className="component">
      <button
        className="buttonOpenModal"
        onClick={() => setActionModal(setToggleModal, toggleModal)}
      >
        Friture
      </button>
      <div id="nuggetPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Friture</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="grillModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Nugget;
