import React from "react";
import { FinalProductBurger } from "../../../interfaces/produitsInterfaces";
import { emptyBurger } from "./assemblyKitchenTools";

function WaitingBurgerJSX({ burger }: { burger: FinalProductBurger }) {
  return (
    <ul>
      {burger.ingredient.bread !== emptyBurger && (
        <li>{burger.ingredient.bread}</li>
      )}
      {burger.ingredient.meat !== emptyBurger && (
        <li>{burger.ingredient.meat}</li>
      )}
      {burger.ingredient.cheese?.length !== 0 &&
        burger.ingredient.cheese !== undefined &&
        burger.ingredient.cheese.map((ingredient) => (
          <li key={ingredient}>{ingredient} </li>
        ))}
      {burger.ingredient.sauce?.length !== 0 &&
        burger.ingredient.sauce !== undefined &&
        burger.ingredient.sauce.map((sauce) => <li key={sauce}>{sauce} </li>)}
      {burger.ingredient.variousIngredient?.length !== 0 &&
        burger.ingredient.variousIngredient !== undefined &&
        burger.ingredient.variousIngredient.map((ingredient) => (
          <li key={ingredient}>{ingredient} </li>
        ))}
    </ul>
  );
}

export default WaitingBurgerJSX;
