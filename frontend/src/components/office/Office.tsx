import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Office.css";

function Office() {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div id="officeComponent" className="component">
      <div className="headerPage">
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        ></button>
      </div>
      <div id="officePageContent"></div>
      <div id={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <div className="headerModal">
            <h2>Magasin</h2>
            <button className="closeModalButton">
              <img alt="fermer"></img>
            </button>
          </div>
          <div id="officeModalContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Office;
