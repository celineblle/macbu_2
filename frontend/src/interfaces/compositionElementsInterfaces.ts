import {
  FinalProductBag,
  FinalProductBurger,
  FinalProductDessert,
  FinalProductDrink,
  FinalProductNugget,
  FinalProductSide,
  Ingredient,
  Size,
} from "./produitsInterfaces";

// STOCKS

export interface SectionRawIngredients {
  sectionName: string;
  title: string;
  productionArray: Ingredient[];
}

// FRIES

export interface ProductionTray {
  productName: string;
  ingredient: string;
  quantity: number;
  grilled: boolean;
  type: string;
  timerId: number;
}

export interface FriesBuilder {
  ingredient: string;
  size: Size | string;
}

// NUGGET

export interface NuggetBoxStock {
  boite: FinalProductNugget;
  quantity: number;
}

// GRILL & FRYING

export interface AvailableMeat {
  meat: Ingredient;
  quantity: number;
}

// KITCHEN

export interface TabsIngredients {
  section: string;
  tabName: string;
  correspondingArray: Ingredient[];
}

export interface AddNewIngredientBurger {
  ingredient: Ingredient;
  ingredientQuantity: number;
}

// DRINK
export interface BuildingDrink {
  size: string;
  flavour: string;
}

// COUNTER
export interface TabsProducts {
  section: string;
  tabName: string;
  correspondingArray:
    | (
        | Ingredient
        | FinalProductBurger
        | FinalProductSide
        | FinalProductDrink
        | FinalProductDessert
      )[]
    | [NuggetBoxStock, NuggetBoxStock, NuggetBoxStock];
}

// MENU

export interface Menu {
  sandwich: FinalProductBurger;
  side: FinalProductSide;
  drink: FinalProductDrink;
  dateId: number;
}

// ORDER

export interface Order {
  products: (
    | FinalProductBurger
    | FinalProductDessert
    | FinalProductDrink
    | FinalProductSide
    | FinalProductNugget
    | Menu
  )[];
  size: number;
  price: number;
  dateId: number;
}

export interface Tray {
  products: (
    | FinalProductBurger
    | FinalProductDessert
    | FinalProductDrink
    | FinalProductSide
    | FinalProductNugget
  )[];
  bagCapacity: number;
  bag: FinalProductBag[];
  price: number;
  dateId: number;
}
