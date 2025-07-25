import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/AssemblyCounter.css";

function AssemblyCounter() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button onClick={() => setActionModal(setToggleModal, toggleModal)}>
        Comptoir
      </button>
      <h2></h2>
      <div></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div>
          <h2>Comptoir</h2>
          <button></button>
        </div>
      </div>
    </>
  );
}

export default AssemblyCounter;
