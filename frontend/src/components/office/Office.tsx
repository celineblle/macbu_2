import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Office.css";
import { SectionRawIngredients } from "../../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../../interfaces/produitsInterfaces";
import { Slide, ToastContainer } from "react-toastify";
import { displayLowBudget } from "../../functions/toastFunctions";
import {
  addToStockUniqueProduct,
  remplaceOldProductByUpdateProduct,
} from "../../functions/inventoryManagementFunctions";


function Office({
  cashFund,
  setCashFund,
  stocksRawsIngredients,
  setStocksRawsIngredients,
}: {
  cashFund: number;
  setCashFund: React.Dispatch<React.SetStateAction<number>>;
  stocksRawsIngredients: SectionRawIngredients[];
  setStocksRawsIngredients: React.Dispatch<
    React.SetStateAction<SectionRawIngredients[]>
  >;
}) {
  // MODAL
  const [toggleModal, setToggleModal] = useState(false);

  // BUY PRODUCT

  function enoughBudgetToBuy(price: number): boolean {
    if (price <= cashFund) {
      return true;
    } else {
      return false;
    }
  }

  function removeFromFund(price: number) {
    let cashFundCopy: number = cashFund;
    cashFundCopy = cashFundCopy - price;
    setCashFund(cashFundCopy);
  }

  function updateStockIngredientArray(
    product: Ingredient,
    sectionName: string
  ) {
    const updatedProduct: Ingredient = addToStockUniqueProduct(product);
    const updatedStocksArray: SectionRawIngredients[] =
      remplaceOldProductByUpdateProduct(sectionName, updatedProduct);
    setStocksRawsIngredients(updatedStocksArray);
  }

  function handleClickBuyProduct(product: Ingredient, sectionName: string) {
    const budgetIsEnough: boolean = enoughBudgetToBuy(product.price);
    if (budgetIsEnough === true) {
      removeFromFund(product.price);
      updateStockIngredientArray(product, sectionName);
    } else {
      displayLowBudget();
    }
  }

  return (
    <div id="officeComponent" className="component">
      <div className="headerPage">
        <h1>MacBu 2</h1>
        <h3>Budget : {cashFund} €</h3>
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          MAGASIN
        </button>
      </div>
      <div id="officePageContent"></div>
      <div className={toggleModal ? "modalOpen" : "modalClose"}>
        <div className="modalContent">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
          <div className="headerModal">
            <h2>Magasin</h2>
            <h3>Budget : {cashFund} €</h3>
            <button
              className="closeModalButton"
              onClick={() => setActionModal(setToggleModal, toggleModal)}
            >
              X
            </button>
          </div>
          <div id="officeModalContent">
            <br />
            {stocksRawsIngredients.map((section: SectionRawIngredients) => (
              <div key={section.title}>
                <div className="allShelf">
                  <h3>{section.title}</h3>
                  <div className="storeShelf">
                  {section.productionArray.map((product: Ingredient) => (
                    <div key={product.ingredientName}
                    className="uniqueProduct"
                    >
                      <>
                      <p>{product.ingredientName} <br />
                      {product.quantity} produits<br />
                    Stock actuel : {product.currentStocks}
                      </p>
                      </>
                      <br />
                      <button
                        onClick={() =>
                          handleClickBuyProduct(product, section.sectionName)
                        }
                        className="neutralButton"
                      >
                        {product.price} €
                      </button>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Office;
