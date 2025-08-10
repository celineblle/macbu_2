import React from "react";
import { FinalProductBurger } from "../../../interfaces/produitsInterfaces";
import { emptyBurger } from "./assemblyKitchenTools";

function BuildingBurgerComponent({
  buildingBurger,
  handleClickRemoveIngredientFromBuildingBurgerForGlobalStock,
}: {
  buildingBurger: FinalProductBurger;
  handleClickRemoveIngredientFromBuildingBurgerForGlobalStock: (
    ingredient: string
  ) => void;
}) {
  return (
    <ul className="buildingBurgerAndRecipeComponent">
      <li>
        Pain :{" "}
        {buildingBurger.ingredient.bread === emptyBurger ? (
          " "
        ) : (
          <button
            onClick={() =>
              handleClickRemoveIngredientFromBuildingBurgerForGlobalStock(
                buildingBurger.ingredient.bread
              )
            }
            className="neutralButton"
          >
            {buildingBurger.ingredient.bread}
          </button>
        )}
      </li>
      <li>
        Viande :{" "}
        {buildingBurger.ingredient.meat === emptyBurger ? (
          " "
        ) : (
          <button
            onClick={() =>
              handleClickRemoveIngredientFromBuildingBurgerForGlobalStock(
                buildingBurger.ingredient.meat
              )
            }
            className="neutralButton"
          >
            {buildingBurger.ingredient.meat}
          </button>
        )}
      </li>
      <li>
        Fromage :{" "}
        {buildingBurger.ingredient.cheese === undefined
          ? " "
          : buildingBurger.ingredient.cheese.map((cheese) => (
              <button
                onClick={() =>
                  handleClickRemoveIngredientFromBuildingBurgerForGlobalStock(
                    cheese
                  )
                }
                key={cheese}
                className="neutralButton"
              >
                {cheese}
              </button>
            ))}
      </li>
      <li>
        Autres ingrédients :{" "}
        {buildingBurger.ingredient.variousIngredient === undefined
          ? " "
          : buildingBurger.ingredient.variousIngredient.map((ingredient) => (
              <button
                onClick={() =>
                  handleClickRemoveIngredientFromBuildingBurgerForGlobalStock(
                    ingredient
                  )
                }
                key={ingredient}
                className="neutralButton"
              >
                {ingredient}
              </button>
            ))}
      </li>
      <li>
        Sauce :{" "}
        {buildingBurger.ingredient.sauce === undefined
          ? " "
          : buildingBurger.ingredient.sauce.map((sauce) => (
              <button
                onClick={() =>
                  handleClickRemoveIngredientFromBuildingBurgerForGlobalStock(
                    sauce
                  )
                }
                key={sauce}
                className="neutralButton"
              >
                {sauce}
              </button>
            ))}
      </li>
    </ul>
  );
}

export default BuildingBurgerComponent;
