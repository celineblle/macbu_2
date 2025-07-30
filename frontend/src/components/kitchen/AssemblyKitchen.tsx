import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyKitchen.css";
import { AvailableFrying } from "../../interfaces/compositionElementsInterfaces";

function AssemblyKitchen({
  availableFrying,
  setAvailableFrying,
}: {
  availableFrying: [AvailableFrying, AvailableFrying, AvailableFrying, AvailableFrying, AvailableFrying];
  setAvailableFrying: React.Dispatch<React.SetStateAction<[AvailableFrying, AvailableFrying, AvailableFrying, AvailableFrying, AvailableFrying]>>;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="assemblyKitchenComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Cuisine
        </button>
      </div>
      <div id="assemblyKitchenPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Cuisine</h2>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="assemblyKitchenModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyKitchen;
