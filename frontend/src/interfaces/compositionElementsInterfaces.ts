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

export interface TabIngredientKitchen {
  section: string;
  tabName: string;
  correspondingArray: Ingredient[];
}

export interface AddNewIngredientBurger {
  ingredient: Ingredient,
  ingredientQuantity: number
}

// DRINK 
export interface BuildingDrink {
  size: string;
  flavour: string;
}

// MENU

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

// ORDER

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
