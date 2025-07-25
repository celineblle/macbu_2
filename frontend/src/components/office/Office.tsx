import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";

function Office() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setActionModal(setToggleModal, toggleModal)}
      ></button>
      <h2>Magasin</h2>
      <div></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div>
          <h2>Magasin</h2>
          <button>
            <img alt="fermer"></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default Office;
