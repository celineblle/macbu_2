import { toast } from "react-toastify";

// OFFICE

const lowBudget = () => (
  <div>
    <p>Il n&apos;y a pas assez de budget pour acheter cet ingrédient</p>
  </div>
);

export function displayLowBudget() {
  toast.error(lowBudget);
}

// FRIES

const noPlace = () => (
  <div>
    <p>Il n&apos;y a pas assez de place</p>
  </div>
);

export function displayNoPlace() {
  toast.error(noPlace);
}

const isGrilled = () => (
  <div>
    <p>
      Les ingredients sont grillés. Impossible de rajouter de nouveaux
      ingredients.
    </p>
  </div>
);

export function displayIsGrilled() {
  toast.error(isGrilled);
}

const portionNotComplete = () => (
  <div>
    <p>Il manque la taille ou l&apos;ingredient pour fabriquer la portion</p>
  </div>
);

export function displayPortionNotComplete() {
  toast.error(portionNotComplete);
}

// ICE CREAM

const toppingNotComplete = () => (
  <div>
    <p>Il manque des toppings pour fabriquer la glace</p>
  </div>
);

export function displayToppingnNotComplete() {
  toast.error(toppingNotComplete);
}

// GENERAL

const noStock = () => (
  <div>
    <p>Il n&apos;y a plus de stocks</p>
  </div>
);

export function displayNoStock() {
  toast.error(noStock);
}
