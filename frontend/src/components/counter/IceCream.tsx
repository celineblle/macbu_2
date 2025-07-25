import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/IceCream.css";

function IceCream() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setActionModal(setToggleModal, toggleModal)}
      ></button>
      <h2>Glace</h2>
      <div></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div>
          <h2>Glace</h2>
          <button>
            <img alt="fermer"></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default IceCream;
