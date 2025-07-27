import React, { useState } from "react";
import { setActionModal } from "../../functions/generalsFuctions";
import "../../style/Office.css";
import { SectionRawIngredients } from "../../interfaces/compositionElementsInterfaces";
import { Ingredient } from "../../interfaces/produitsInterfaces";
import { Slide, ToastContainer, toast } from "react-toastify";
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

  // TOAST ERROR

  const lowBudget = () => (
    <div>
      <p>Il n&apos;y a pas assez de budget pour acheter cet ingrédient</p>
    </div>
  );
  const displayLowBudget = () => {
    toast.error(lowBudget);
  };

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
      remplaceOldProductByUpdateProduct(
        stocksRawsIngredients,
        sectionName,
        updatedProduct
      );
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
        <h2>Budget : {cashFund} €</h2>
        <button
          className="buttonOpenModal"
          onClick={() => setActionModal(setToggleModal, toggleModal)}
        >
          Magasin
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
            <h2>Budget : {cashFund} €</h2>
            <button className="closeModalButton">
              <img alt="fermer"></img>
            </button>
          </div>
          <div id="officeModalContent">
            <br />
            {stocksRawsIngredients.map((section: SectionRawIngredients) => (
              <>
                <div>
                  <h3>{section.title}</h3>
                  {section.productionArray.map((product: Ingredient) => (
                    <div>
                      <p>{product.ingredientName}</p>
                      <p>{product.quantity} produits</p>
                      <p>Stock actuel : {product.currentStocks}</p>
                      <br />
                      <button
                        onClick={() =>
                          handleClickBuyProduct(product, section.sectionName)
                        }
                      >
                        {product.price} €
                      </button>
                    </div>
                  ))}
                </div>
                <br />
                <hr />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Office;
