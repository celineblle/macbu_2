import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";

function Fries() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setActionModal(setToggleModal, toggleModal)}
      ></button>
      <h2>Frites</h2>
      <div></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div>
          <h2>Frites</h2>
          <button>
            <img alt="fermer"></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default Fries;
