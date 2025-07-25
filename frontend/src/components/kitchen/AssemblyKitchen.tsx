import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyKitchen.css";

function AssemblyKitchen() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="assemblyKitchenComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        ></button>
      </div>
      <div id="assemblyKitchenPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Cuisine</h2>
            <button>
              <img alt="fermer"></img>
            </button>
          </div>
          <div id="assemblyKitchenModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyKitchen;
