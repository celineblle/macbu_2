import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyCounter.css";
import { FinalProductBurger } from "../../interfaces/produitsInterfaces";

function AssemblyCounter({
  cashFund,
  setCashFund,
  readyBurger,
  setReadyBurger,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  readyBurger: FinalProductBurger[];
  setReadyBurger: React.Dispatch<React.SetStateAction<FinalProductBurger[]>>;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

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
      <div id="assemblyCounterPageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
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
