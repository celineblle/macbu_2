import React from "react";
import { Ingredient } from "../interfaces/produitsInterfaces";

export function setActionModal(
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  getter: boolean
) {
  setter(!getter);
}

export function removeElementFromRefArray(
  oldRefArray: React.RefObject<Ingredient[]>,
  element: Ingredient,
  oldArraySetter: React.Dispatch<React.SetStateAction<Ingredient[]>>
) {
  const oldStageElementIndex: number = oldRefArray.current.indexOf(element);
  const oldStageArrayCopy: Ingredient[] = oldRefArray.current.slice();
  oldStageArrayCopy.splice(oldStageElementIndex, 1);
  oldArraySetter(oldStageArrayCopy);
}

export function updateEmptyPlace(
  takenPlaces: number,
  limitSizePlace: number,
  setterEmptyPlace: React.Dispatch<React.SetStateAction<string[]>>,
  emptyPatern: string
) {
  const emptyPlace: number = limitSizePlace - takenPlaces;
  const emptyPlaceArray: string[] = [];
  if (emptyPlace > 0) {
    for (let i = 0; i < emptyPlace; i++) {
      emptyPlaceArray.push(emptyPatern);
    }
  }
  setterEmptyPlace(emptyPlaceArray);
}
