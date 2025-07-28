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

const noPlaceFries = () => (
  <div>
    <p>Il n&apos;y a pas assez de place</p>
  </div>
);

export function displayNoPlaceFries() {
  toast.error(noPlaceFries);
}
