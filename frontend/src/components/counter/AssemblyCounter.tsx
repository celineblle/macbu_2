import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyCounter.css";

function AssemblyCounter({
  cashFund,
  setCashFund,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
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
            <button className="closeModalButton"></button>
          </div>
          <div id="assemblyCounterModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default AssemblyCounter;
