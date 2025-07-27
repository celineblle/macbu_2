import { FinalProductBag, FinalProductBurger, FinalProductDessert, FinalProductDrink, FinalProductSide, Ingredient } from "./produitsInterfaces";

export interface SectionRawIngredients {
  sectionName: string;
  title: string;
  productionArray: Ingredient[]
}


export interface Menu {
  sandwich: FinalProductBurger;
  side: FinalProductSide;
  drink: FinalProductDrink;
}

export interface MenuEnfant {
  sandwich: FinalProductBurger;
  side: FinalProductSide;
  drink: FinalProductDrink;
  dessert: FinalProductDessert;
}

export interface Order {
  products: (
    | FinalProductBurger
    | FinalProductDessert
    | FinalProductDrink
    | FinalProductSide
    | Menu
    | MenuEnfant
  )[];
  size: number;
  price: number;
}

export interface Tray {
  products: (
    | FinalProductBurger
    | FinalProductDessert
    | FinalProductDrink
    | FinalProductSide
    | FinalProductBag
  )[];
  bagCapacity: number;
  bag: FinalProductBag;
  price: number;
}